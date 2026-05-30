import { useCartState } from "@/src/@modules/cart/libs/hooks/useCartState";
import useGlobalState from "@/src/@libs/hooks/useGlobalState";
import cn from "@/src/@libs/utils/_cn";
import { calculateTotal } from "@/src/@libs/utils/helperFunction";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { ClassNameValue } from "tailwind-merge";
import { ICartItem } from "../libs/interfaces";
import { message } from "antd";
import CartSingleItem from "./CartSingleItem";

interface IProps {
  className?: ClassNameValue;
  // cart??: ICartItem[];
  handleOnCloseAfterCheckoutFn: () => void;
}

const CartContent: React.FC<IProps> = ({
  className,
  handleOnCloseAfterCheckoutFn,
}) => {
  const [cart] = useGlobalState<ICartItem[]>({
    key: "cart",
    initialValue: [],
  });
  const [messageApi, contextHolder] = message.useMessage();
  const { updateCartItemQuantity, removeSingleItem } = useCartState(messageApi);
  const calculateSaved = () => {
    return cart?.reduce(
      (sum, item) =>
        sum + (item?.price?.originalPrice - item.price?.price) * item.quantity,
      0,
    );
  };

  const handleQuantityChange = (item: ICartItem, action: string) => {
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
    // setCart(updatedCart);
  };

  const handleDeleteItem = (item: any) => {    
    // const updatedCart = cart?.filter((item) => item._id !== itemId);
    // setCart(updatedCart);
    removeSingleItem(item);
  };
  // const handleQuantityUpdateFn = async (id: string) => {
  //   const updatedCart = cart?.filter((item) => item._id !== id);
  //   console.log(updatedCart);

  //   try {
  //     const payload = {
  //       productId: id,
  //       action: "decrement",
  //       // price: selectedPriceObj,
  //       quantity: 1,
  //     };
  //     updateCartItemQuantity(payload);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const total = calculateTotal(cart);
  const saved = calculateSaved();

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      {contextHolder}
      {/* Header */}
      {/* <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        <div className="flex gap-2">
          <button
            onClick={handleClearCart}
            className="text-gray-400 hover:text-red-600 transition"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </div> */}

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto space-y-2 hidden_scrollbar">
        {cart?.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Cart is empty</p>
        ) : (
          cart?.map((item, idx) => <CartSingleItem key={idx} item={item} handleDeleteItem={handleDeleteItem} handleQuantityChange={handleQuantityChange}/>)
        )}
      </div>

      <div className="border-t p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold text-green-600">৳ {total}</span>
        </div>

        {saved > 0 && (
          <div className="text-sm">
            <span className="text-gray-600">Saved: </span>
            <span className="font-semibold text-green-600">৳ {saved}</span>
          </div>
        )}

        <Link href={"/checkout"}>
          <button
            onClick={handleOnCloseAfterCheckoutFn}
            disabled={cart?.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
          >
            Proceed To Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartContent;
