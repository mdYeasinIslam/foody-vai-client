export interface IProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
interface IPrice {
  weight: number;
  price: number;
  originalPrice: number;
  weightName: string;
  currency: string;
  availableWeight: number;
}
export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  prices: IPrice[];
  category: string;
  subcategory?: string;
  quantity?: number;
  img: string;
}
export interface IProductCreateAndUpdate {
  _id: string;
  name: string;
  description?: string;
  prices: IPrice[];
  category: string;
  subcategory?: string;
  quantity?: number;
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
