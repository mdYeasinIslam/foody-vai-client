export interface ICartItemFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface ICartItem {
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
export interface IPrice {
  weight: number;
  price: number;
  originalPrice: number;
  weightName: string;
  currency: string;
}

export interface ICartItemCreate {
  id: string;
  name: string;
  description?: string;
  price: IPrice;
  category: string;
  quantity: number;
  img: string;
}
export type ICartItemResponse = {
  success: boolean;
  message: string;
  data: ICartItem;
};
export type ICartsItemResponse = ICartItem[];
