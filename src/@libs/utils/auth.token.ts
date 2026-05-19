import cookiesStorage from "./cookiesStorage";

export const getAccessToken = () => {
  return cookiesStorage.get("auth_token");
};
export const removeAccessToken = (): void => {
  return cookiesStorage.remove("auth_token");
};
