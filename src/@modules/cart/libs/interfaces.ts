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
export interface ICartItemCreate {
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
export type ICartItemResponse = ICartItem;
export type ICartsItemResponse = ICartItem[];

