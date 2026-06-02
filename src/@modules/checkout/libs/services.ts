import { ENV } from "@/environments";
import { AxiosInstance } from "@/src/@libs/config/AxiosInstance";
import {
  ICustomerAddress,
  ICustomerAddressCreate,
  ICustomerAddressesResponse,
  ICustomerAddressResponse,
  IDistrictsAndZillasResponse,
} from "./interfaces";
import axios from "axios";

// const BD_API_END_POINT = "https://bdapis.vercel.app/geo/v2.0/districts";
const END_POINT = "customer-address";
const BD_API_FOR_DISTRICT_AND_AREAS = ENV.bdApi;
export const CheckoutServices = {
  Name: END_POINT,
  findDistrict: async () => {
    try {
      const response = await axios.get<IDistrictsAndZillasResponse>(
        `${BD_API_FOR_DISTRICT_AND_AREAS}/districts`,
      );
      return Promise.resolve(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  findAreas: async (id: number) => {
    try {
      const res = await axios.get<IDistrictsAndZillasResponse>(
        `${BD_API_FOR_DISTRICT_AND_AREAS}/upazilas/${id}`,
      );
      return Promise.resolve(res.data);
    } catch (error) {
      throw error;
    }
  },

  //--------------actual service of Customer Address------------
  findAddress: async (): Promise<ICustomerAddressesResponse> => {
    try {
      const res = await AxiosInstance.get(END_POINT);
      return Promise.resolve(res.data);
    } catch (error) {
      throw error;
    }
  },

  create: async (
    payload: ICustomerAddressCreate,
  ): Promise<ICustomerAddressResponse> => {
    try {
      const res = await AxiosInstance.post(END_POINT, payload);
      return Promise.resolve(res.data);
    } catch (error) {
      throw error;
    }
  },
  update: async (
    id: string,
    payload: ICustomerAddress,
  ): Promise<ICustomerAddressResponse> => {
    try {
      const res = await AxiosInstance.put(`${END_POINT}/${id}`, payload);
      return Promise.resolve(res.data);
    } catch (error) {
      throw error;
    }
  },
  deleteOne: async (id: string): Promise<ICustomerAddressResponse> => {
    try {
      const res = await AxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res.data);
    } catch (error) {
      throw error;
    }
  },
  deleteAll: async () => {
    try {
      const res = await AxiosInstance.delete(END_POINT);
      return Promise.resolve(res.data);
    } catch (error) {
      throw error;
    }
  },
};
