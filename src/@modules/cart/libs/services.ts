
import { AxiosInstance } from "@/src/@libs/config/AxiosInstance";
import axios from "axios";
import { ICartItemFilter, ICartItemResponse, ICartsItemResponse } from "./interfaces";

const END_POINT: string = "/products.json";

export const CartService = {
  Name: END_POINT,
  async find(query?: ICartItemFilter): Promise<ICartsItemResponse> {
    try {
      const res = await AxiosInstance.get(END_POINT);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
  async findById(id: string): Promise<ICartItemResponse> {
    try {
      const res = await axios.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
};
