import axios from "axios";
import { ISignIn, IAuthResponse, ISignUp } from "./interface";
import { AxiosInstance } from "@/src/@libs/config/AxiosInstance";

const END_POINT = "auth";
export const AuthServices = {
  NAME: END_POINT,
  signIn: async (payload: ISignIn): Promise<IAuthResponse> => {
    try {
      // const response = await axios.post(
      //   `${paths?.apiRoute}/${END_POINT}/signIn`,
      //   payload
      // );
      // console.log(response)
      const response = await AxiosInstance.post<IAuthResponse>(
        `${END_POINT}/signIn`,
        payload,
      );
      return Promise.resolve(response.data);
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        const { response } = error;
        console.error("Sign in error:", response.data);
        throw { status: response.status, message: response.data?.message };
      }
      console.error("Unknown error during sign in:", error);
      throw error;
    }
  },
  signUp: async (payload: ISignUp) => {
    try {
      // const res = await axios.post(
      //   `${paths?.apiRoute}/${END_POINT}/create-user`,
      //   payload
      // );
      const res = await AxiosInstance.post<IAuthResponse>(
        `${END_POINT}/create-user`,
        payload,
      );
      return Promise.resolve(res.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const { response } = error;
        console.error("Sign Up error:", response.data);
        throw { status: response.status, message: response.data?.message };
      }
      console.error("Unknown error during sign in:", error);
      throw { message: "Something went wrong!!" };
    }
  },
};
