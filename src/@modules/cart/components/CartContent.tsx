import cn from "@/src/@libs/utils/_cn";
import {
  calculateSaved,
  calculateTotal,
} from "@/src/@libs/utils/helperFunction";
import { useCartState } from "@/src/@modules/cart/libs/hooks/useCartState";
import { message } from "antd";
import Link from "next/link";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
import { ICartItem } from "../libs/interfaces";
import CartSingleItem from "./CartSingleItem";
import BaseButton from "@/src/@base/components/BaseButton";

interface IProps {
  className?: ClassNameValue;
  handleOnCloseAfterCheckoutFn: () => void;
}

const CartContent: React.FC<IProps> = ({
  className,
  handleOnCloseAfterCheckoutFn,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { cart, updateCartItemQuantity, removeSingleItem } =
    useCartState(messageApi);

  const handleQuantityChangeFn = (item: ICartItem, action: string) => {
    const findItem = cart?.find((i) => i.productId === item.productId);
    try {
      if (findItem) {
        const payload = {
          productId: findItem.productId,
          action: action,
          price: findItem?.price,
          quantity: 1,
        };
        updateCartItemQuantity(payload, action);
      } else {
        console.log("item not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItemFn = (item: any) => {
    removeSingleItem(item);
  };
  const total = calculateTotal(cart || []);
  const saved = calculateSaved(cart || []);

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      {contextHolder}

      <div className="flex-1 overflow-y-auto space-y-2 hidden_scrollbar">
        {cart?.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Cart is empty</p>
        ) : (
          cart?.map((item, idx) => (
            <CartSingleItem
              key={idx}
              item={item}
              handleDeleteItemFn={handleDeleteItemFn}
              handleQuantityChangeFn={handleQuantityChangeFn}
            />
          ))
        )}
      </div>

      <div className="border-t p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold text-green-600">৳ {total}</span>
        </div>

        {saved && saved > 0 && (
          <div className="text-sm">
            <span className="text-gray-600">Saved: </span>
            <span className="font-semibold text-green-600">৳ {saved}</span>
          </div>
        )}

        <Link href={"/checkout"}>
          {/* <button  disabled={cart?.length === 0}
            onClick={handleOnCloseAfterCheckoutFn} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition cursor-pointer">
            Proceed To Checkout
          </button> */}
          <BaseButton
            disabled={cart?.length === 0}
            onClick={handleOnCloseAfterCheckoutFn}
            content="Proceed To Checkout"
          />
        </Link>
      </div>
    </div>
  );
};

export default CartContent;
