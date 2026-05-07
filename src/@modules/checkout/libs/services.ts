import { AxiosInstance } from "@/src/@libs/config/AxiosInstance";
import { IDistrictsAndZillas, IDistrictsAndZillasResponse } from "./interfaces";

const END_POINT = "https://bdapis.vercel.app/geo/v2.0/districts";
export const CheckoutServices = {
  Name: END_POINT,
  findDistrict: async () => {
    try {
      const response = await AxiosInstance.get<IDistrictsAndZillasResponse>(END_POINT);
      return Promise.resolve(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
