import { AxiosInstance } from "@/src/@libs/config/AxiosInstance";
import {
  ICartItemCreate,
  ICartItemResponse,
  ICartItemUpdate,
  ICartsItemResponse
} from "./interfaces";

const END_POINT: string = "/cart";

export const CartService = {
  Name: END_POINT,
  async find(): Promise<ICartsItemResponse> {
    try {
      const res = await AxiosInstance.get(END_POINT);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
  async findById(id: string): Promise<ICartItemResponse> {
    try {
      const res = await AxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
  async create(payload: ICartItemCreate): Promise<ICartItemResponse> {
    try {
      const res = await AxiosInstance.post(`${END_POINT}/add-product`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
  async delete(id: string): Promise<ICartItemResponse> {
    try {
      const res = await AxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
  async deleteAll(): Promise<ICartItemResponse> {
    try {
      const res = await AxiosInstance.delete(`${END_POINT}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },

  async update(payload: ICartItemUpdate): Promise<ICartItemResponse> {
    try {
      const res = await AxiosInstance.patch(
        `${END_POINT}/${payload.productId}/quantity`,
        payload,
      );
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
  //delete cart item
  async deleteCart(id: string) {
    try {
      const res = await AxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
};
