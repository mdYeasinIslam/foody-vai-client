import { ENV } from "@/environments";
import { AxiosInstance } from "@/src/@libs/config/AxiosInstance";
import { IDistrictsAndZillasResponse } from "./interfaces";

const END_POINT = "https://bdapis.vercel.app/geo/v2.0/districts";
const DISTRICT_API = ENV.bdApi;
export const CheckoutServices = {
  Name: END_POINT,
  findDistrict: async () => {
    try {
      const response = await AxiosInstance.get<IDistrictsAndZillasResponse>(
        `${DISTRICT_API}/districts`,
      );
      return Promise.resolve(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  findAreas: async (id: number) => {
    try {
      const res = await AxiosInstance.get<IDistrictsAndZillasResponse>(
        `${DISTRICT_API}/upazilas/${id}`,
      );
      return Promise.resolve(res.data);
    } catch (error) {
      throw error;
    }
  },
};
