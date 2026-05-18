import Cookies from "js-cookie";

export const getAccessToken = () => {
  return Cookies.get("auth_token");
};
export const removeAccessToken = (): void => {
  Cookies.remove("auth_token");
};