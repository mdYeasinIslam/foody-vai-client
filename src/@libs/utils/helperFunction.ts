import { ICartItem } from "@/src/@modules/cart/libs/interfaces";

interface ValueType extends ICartItem {

  [key: string]: any;
}
export const calculateTotal = (arrayCart: ValueType[]) => {
  return arrayCart
    .reduce((sum, item) => sum + item?.price.price * item?.quantity, 0);
};
 export const calculateSaved = (cart: ICartItem[]) => {
   return cart?.reduce(
     (sum, item) =>
       sum + (item?.price?.originalPrice - item.price?.price) * item.quantity,
     0,
   );
 };
export const calculateDiscountFn = (cart: ICartItem[], isDiscount: boolean) => {
  const discountPercentage = isDiscount ? 10 : 0;
  const total = calculateTotal(cart);
  return (total * discountPercentage) / 100;
};