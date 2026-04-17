
import axios from "axios";
import { IProductFilter, IProductResponse, IProductsResponse } from "./interfaces";

const END_POINT: string = "/data/products.json";

export const ProductsService = {
  Name: END_POINT,
  async find(query?: IProductFilter): Promise<IProductsResponse> {
    try {
      const res = await axios.get(END_POINT);
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
