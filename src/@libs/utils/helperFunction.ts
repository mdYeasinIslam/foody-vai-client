import { ICartItem } from "@/src/@modules/cart/libs/interfaces";

interface ValueType extends ICartItem {
  price: number;
  quantity: number;
  [key: string]: any;
}
export const calculateTotal = (arrayCart: ValueType[]) => {
  return arrayCart
    .reduce((sum, item) => sum + item?.price * item?.quantity, 0);
};
