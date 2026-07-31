import { AxiosInstance } from "@/src/@libs/config/AxiosInstance";
import {
  ICategoriesResponse,
  ICategoryCreateAndUpdate,
  ICategoryFilter,
  ICategoryResponse,
} from "./interfaces";

const END_POINT: string = "category";

export const CategoriesService = {
  Name: END_POINT,
  async create(payload: ICategoryCreateAndUpdate): Promise<ICategoryResponse> {
    try {
      const res = await AxiosInstance.post(
        `${END_POINT}/add-category`,
        payload,
      );
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
  async find(query?: ICategoryFilter): Promise<ICategoriesResponse> {
    try {
      const res = await AxiosInstance.get(END_POINT);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
  async findById(id: string): Promise<ICategoryResponse> {
    try {
      const res = await AxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw error;
    }
  },
  update: async (
    id: string,
    payload: Partial<ICategoryCreateAndUpdate>,
  ): Promise<ICategoryResponse> => {
    const res = await AxiosInstance.patch(`${END_POINT}/${id}`, payload);

    return res.data;
  },

  delete: async (id: string): Promise<ICategoryResponse> => {
    const res = await AxiosInstance.delete(`${END_POINT}/${id}`);
    return res.data;
  },
};
