import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL:'http://localhost:5000'
//   baseURL: "https://foody-vai-server-production.up.railway.app",
  // baseURL:'/data'
});