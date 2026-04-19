export interface IProductFilter {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}

export interface IProduct {
  id: string;
  name: string;
  description?: string;
  prices: { weight: number, price: number, originalPrice: number }[];
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
export type IProductResponse = IProduct;
export type IProductsResponse = IProduct[];

