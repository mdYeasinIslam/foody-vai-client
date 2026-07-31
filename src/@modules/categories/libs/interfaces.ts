export interface ICategoryFilter {
  categoryName?: string;
}
export interface ICategory {
  _id?: string;
  name: string;
  description?: string;
  img: string;
}
export interface ICategoryCreateAndUpdate {
  _id?: string;
  name: string;
  description?: string;
  img: string;
}
export interface ICategoryResponse {
  success: boolean;
  message: string;
  data: ICategory;
  [key: string]: any;
}
export interface ICategoriesResponse {
  success: boolean;
  message: string;
  data: ICategory[];
  [key: string]: any;
}
