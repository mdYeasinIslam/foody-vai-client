import { ICartItem, ICartItemCreate } from "@/src/@modules/cart/libs/interfaces";

interface ValueType extends ICartItemCreate {

  [key: string]: any;
}
export const calculateTotal = (arrayCart: ValueType[]) => {
  return arrayCart
    .reduce((sum, item) => sum + item?.price.price * item?.quantity, 0);
};
