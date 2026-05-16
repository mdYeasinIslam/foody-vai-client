import useGlobalState from "@/src/@libs/hooks/useGlobalState";
import { IAuthState, IAuthUser } from "../interface";


const AUTH_KEY = "auth"; 

export const useAuthState = () => {
  const [auth, setAuth, clearAuth] = useGlobalState<IAuthState>({
    key: AUTH_KEY,
    initialValue: { user: null, token: null },
  });

  // ── Setters ──────────────────────────────────────────────────────────────────

  const setAuthUser = (user: IAuthUser, token: string) => {
    setAuth({ user, token });
  };

  const clearAuthUser = () => {
    clearAuth();
  };

  // ── Derived helpers ──────────────────────────────────────────────────────────

  const isAuthenticated = !!auth?.token && !!auth?.user;
  const isAdmin = auth?.user?.role === "admin";
  const isUser = auth?.user?.role === "user";

  return {
    user: auth?.user ?? null, // IAuthUser | null
    token: auth?.token ?? null, // string | null
    isAuthenticated, // boolean — use for protected routes
    isAdmin, // boolean — use for admin guards
    isUser, // boolean
    setAuthUser, // call on signIn/signUp success
    clearAuthUser, // call on signOut
  };
};
