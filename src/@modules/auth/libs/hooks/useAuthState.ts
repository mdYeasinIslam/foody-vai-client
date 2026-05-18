import useGlobalState from "@/src/@libs/hooks/useGlobalState";
import { IAuthState, IAuthUser } from "../interface";
import { MessageInstance } from "antd/es/message/interface";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { getAccessToken } from "@/src/@libs/utils/auth.token";

const AUTH_KEY = "auth";
const TOKEN_COOKIE = "auth_token";
export const useAuthState = (messageApi?: MessageInstance) => {
  const [auth, setAuth, clearAuth] = useGlobalState<IAuthState>({
    key: AUTH_KEY,
    initialValue: { user: null, token: null },
  });

  // auto-sync: if cookie expired but localStorage still has data → clear it ──
  useEffect(() => {
    const cookie = getAccessToken()
    const hasLocalStorageData = !!auth?.token && !!auth?.user;

    if (!cookie && hasLocalStorageData) {
      clearAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  const setAuthUser = (user: IAuthUser, token: string) => {
    setAuth({ user, token });
    //  cookie — for middleware (new)
    Cookies.set(TOKEN_COOKIE, token, {
      expires: 60 / 86400,
      sameSite: "strict",
      // httpOnly: false — js-cookie can't set httpOnly, only server can
      // but middleware just needs to READ it, so this is fine
    });
  };

  const clearAuthUser = () => {
    clearAuth();
    Cookies.remove(TOKEN_COOKIE);
    messageApi?.success("Logged out successfully");
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
    messageApi,
  };
};
