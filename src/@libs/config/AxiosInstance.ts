import axios from "axios";
import { getAccessToken } from "../utils/auth.token";
import { unauthorized } from "next/navigation";

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  //   baseURL: "https://foody-vai-server-production.up.railway.app/",
  // baseURL:'/data'
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Barer ${token}`;
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
      console.log(unauthorized);
    }
    return Promise.reject(error);
  },
);
