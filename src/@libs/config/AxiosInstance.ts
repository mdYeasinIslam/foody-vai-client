import axios from "axios";
import { getAccessToken, removeAccessToken } from "../utils/auth.token";

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  // baseURL: "https://foody-vai-server-production.up.railway.app/",
  // baseURL:'/data'
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      removeAccessToken();
      localStorage.removeItem("auth");
      window.location.href = "/signIn";
    }
    return Promise.reject(error);
  },
);
