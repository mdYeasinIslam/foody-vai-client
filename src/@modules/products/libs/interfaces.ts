export interface IProductFilter {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  price: number;
  weight: number[];
  category: string;
  img: string;
}
export interface IProductCreate {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  price: number;
  weight: number[];
  category: string;
  img: string;
}
export type IProductResponse = IProduct;
export type IProductsResponse = IProduct[];

