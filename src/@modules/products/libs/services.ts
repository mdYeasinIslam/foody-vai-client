
import { AxiosInstance } from "@/src/@libs/config/AxiosInstance";
import axios from "axios";
import { IProductFilter, IProductResponse, IProductsResponse } from "./interfaces";

const END_POINT: string = "/products";

export const ProductsService = {
  Name: END_POINT,
  async create(payload: any): Promise<IProductResponse> {
    try {
      const res = await AxiosInstance.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error
    }
  },
  async find(query?: IProductFilter): Promise<IProductsResponse> {
    try {
      const res = await AxiosInstance.get(END_POINT);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
  async findById(id: string): Promise<IProductResponse> {
    try {
      const res = await axios.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
};
