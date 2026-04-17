import axios from "axios";
import { IProductFilter, IProductsResponse } from "./interfaces";

const END_POINT: string = "";

export const ProductsService = {
  Name: END_POINT,
  async find(query: IProductFilter): Promise<IProductsResponse> {
    try {
      const res = await axios.get(END_POINT, { params: query });
      return Promise.resolve(res.data);
    } catch (error) {
      throw error;
    }
  },
  async findById(id: string): Promise<IProductsResponse> {
    try {
      const res = await axios.get(`${END_POINT}/${id}`);
      return Promise.resolve(res.data);
    } catch (error) {
      throw error;
    }
  },
};
