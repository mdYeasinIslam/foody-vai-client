export interface IProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  prices: { weight: number; price: number; originalPrice: number }[];
  category: string;
  img: string;
}
export interface IProductCreate {
  id: string;
  name: string;
  description?: string;
  price: number;
  weight: number;
  originalPrice: number;
  category: string;
  quantity: number;
  img: string;
}
export interface IProductResponse {
  success: boolean;
  message: string;
  data: IProduct;
}
export interface IProductsResponse {
  success: boolean;
  message: string;
  data: IProduct[];
  count: number;
}
