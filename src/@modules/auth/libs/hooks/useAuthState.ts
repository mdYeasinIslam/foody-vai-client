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
    const cookie = getAccessToken();
    const hasLocalStorageData = !!auth?.token && !!auth?.user;

    if (!cookie && hasLocalStorageData) {
      clearAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token]);

  const setAuthUser = (user: IAuthUser, token: string) => {
    setAuth({ user, token });
    Cookies.set(TOKEN_COOKIE, token, {
      expires: 30 / 1440,
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

  // helpers ──────────────────────────────────────────────────────────
  const cookieExists = !!Cookies.get(TOKEN_COOKIE);
  const isAuthenticated = !!auth?.token && !!auth?.user && cookieExists;
  const isAdmin = auth?.user?.role === "admin";
  const isUser = auth?.user?.role === "user";
  const info = isAuthenticated ? (auth?.user ?? null) : null;
  return {
    user: info,
    token: info,
    isAuthenticated,
    isAdmin,
    isUser,
    setAuthUser,
    clearAuthUser,
    messageApi,
  };
};
