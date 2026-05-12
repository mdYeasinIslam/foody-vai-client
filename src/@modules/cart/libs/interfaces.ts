export interface ICartItemFilter {
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
}

export interface ICartItem {
  _id: string;
  productId: string;
  name: string;
  description?: string;
  price: IPrice;
  category: string;
  quantity: number;
  img: string;
}

export interface ICartItemCreate {
  productId: string;
  name: string;
  description?: string;
  price: IPrice;
  category: string;
  quantity: number;
  img: string;
}
export type ICartItemResponse = {
  success: boolean;
  alreadyExist?: boolean;
  message: string;
  data: ICartItemCreate;
  cartItemId?: string;
};
export type ICartsItemResponse = ICartItem[];
