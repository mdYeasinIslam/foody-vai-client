import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; //use jose, NOT jsonwebtoken (edge compatible)

const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

const COOKIE_NAME = "auth_token";

const ROUTES = {
  protected: ["/checkout", "/profile", "/orders"],
  admin: ["/admin/dashboard", "/admin/orders", "/admin/products", "/admin/users"],
  guestOnly: ["/signIn", "/signUp"],
};

// ── Helpers ────────────────────────────────────────────────────────────────────

const matchesRoute = (pathname: string, routes: string[]): boolean =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

interface JWTPayload {
  id: string;
  email: string;
  role: "user" | "admin";
}

const verifyToken = async (token: string): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    // token expired, invalid signature, malformed etc.
    return null;
  }
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(COOKIE_NAME)?.value ?? null;

  // verify token — null means expired or invalid
  const payload = token ? await verifyToken(token) : null;
  const isAuthenticated = !!payload;
  const isAdmin = payload?.role === "admin";

  // ── 1. Guest-only routes (signIn, signUp) ──────────────────────────────────
  // Already logged in → redirect away from auth pages
  if (matchesRoute(pathname, ROUTES.guestOnly)) {
    if (isAuthenticated) {
      const redirectTo = isAdmin ? "/admin" : "/";
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
    return NextResponse.next();
  }

  // ── 2. Admin routes ────────────────────────────────────────────────────────
  if (matchesRoute(pathname, ROUTES.admin)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(`/signIn?redirect=${encodeURIComponent(pathname)}`, req.url),
      );
    }
    if (!isAdmin) {
      // logged in but not admin → send to home
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // ── 3. Protected routes ────────────────────────────────────────────────────
  if (matchesRoute(pathname, ROUTES.protected)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(`/signIn?redirect=${encodeURIComponent(pathname)}`, req.url),
      );
    }
    return NextResponse.next();
  }

  // ── 4. Public routes — allow everything ───────────────────────────────────
  return NextResponse.next();
}

// ── Matcher — tells Next.js which paths to run middleware on ──────────────────
// excludes _next, static files, images, api routes automatically
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)",
  ],
};
