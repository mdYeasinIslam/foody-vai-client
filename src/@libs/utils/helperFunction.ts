import { ICartItem } from "@/src/@modules/cart/libs/interfaces";
import { Delivery_Charge } from "@/src/@modules/checkout/libs/enums";

interface ValueType extends ICartItem {
  [key: string]: any;
}
// export const calculateTotal = (arrayCart: ValueType[]) => {
//   return arrayCart
//     .reduce((sum, item) => sum + item?.price.price * item?.quantity, 0);
// };
export const calculateTotal = (
  items: ValueType[] = [],
  paymentMethod?: string,
  districtName?: string,
): {
  subTotal: number;
  tax: number;
  deliveryFee: Delivery_Charge;
  totalAmount: number;
} => {
  const subTotal = items.reduce(
    (acc, item) => acc + item.price.price * item.quantity,
    0,
  );
  const tax = parseFloat((subTotal * 0.1).toFixed(2));
  const deliveryFee: Delivery_Charge =
    districtName === "Dhaka"
      ? Delivery_Charge.INSIDE_DHAKA
      : Delivery_Charge.OUTSIDE_DHAKA;
  let total = 0;
  if (paymentMethod === "cod") {
    total = subTotal + deliveryFee;
  } else {
    total = subTotal;
  }
  return {
    subTotal,
    tax,
    deliveryFee,
    totalAmount: total,
  };
};
export const calculateSaved = (cart: ICartItem[]) => {
  return cart?.reduce(
    (sum, item) =>
      sum + (item?.price?.originalPrice - item.price?.price) * item.quantity,
    0,
  );
};
// export const calculateDiscountFn = (cart: ICartItem[], isDiscount: boolean) => {
//   const discountPercentage = isDiscount ? 10 : 0;
//   const total = calculateTotal(cart);
//   return (total * discountPercentage) / 100;
// };
