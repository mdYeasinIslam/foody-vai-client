export interface IProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
// interface IPrice {
//   weight: number;
//   price: number;
//   originalPrice: number;
//   weightName: string;
//   currency: string;
//   availableWeight: number;
// }
// export interface Product {
//   _id: string;
//   name: string;
//   description?: string;
//   prices: IPrice[];
//   category: string;
//   subcategory?: string;
//   quantity?: number;
//   img: string;
// }
export type IProduct = {
  _id: string;
  name: string;
  description?: string;
  img: string;
  sellUnit: string;
  price: number;
  salePrice: number;
  averageRating: number;
  category: string;
  quantity: number;
  slug: string;
};
export type IProductCreateAndUpdate = {
  _id?: string;
  name: string;
  description?: string;
  img: string;
  sellUnit: string;
  price: number;
  salePrice: number;
  averageRating: number;
  category: string;
  quantity: number;
  slug: string;
};
// export interface ProductCreateAndUpdate {
//   _id: string;
//   name: string;
//   description?: string;
//   prices: IPrice[];
//   category: string;
//   subcategory?: string;
//   quantity?: number;
//   img: string;
// }

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
