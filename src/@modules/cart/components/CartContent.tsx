import useGlobalState from "@/src/@libs/hooks/useGlobalState";
import cn from "@/src/@libs/utils/_cn";
import Image from "next/image";
import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { ClassNameValue } from "tailwind-merge";
import { ICartItem, ICartItemCreate } from "../libs/interfaces";
import Link from "next/link";
import { calculateTotal } from "@/src/@libs/utils/helperFunction";

interface IProps {
  className?: ClassNameValue;
  cartItems: ICartItem[];
  handleOnCloseAfterCheckoutFn: () => void;
}

const CartContent: React.FC<IProps> = ({
  className,
  cartItems,
  handleOnCloseAfterCheckoutFn,
}) => {
  const [, setCart] = useGlobalState<ICartItem[]>({
    key: "cart",
    initialValue: [],
  });

  // const calculateTotal = () => {
  //   return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // };

  const calculateSaved = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item?.price?.originalPrice - item.price?.price) * item.quantity,
      0,
    );
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item,
    );
    setCart(updatedCart);
  };

  const handleDeleteItem = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCart(updatedCart);
  };

  const total = calculateTotal(cartItems);
  const saved = calculateSaved();

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
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
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="flex justify-between border-b pb-1">
              <div className="flex items-center gap-3">
                {/* Product Image */}
                <div className="w-16 h-16 bg-gray-200 rounded shrink-0">
                  {item.img && (
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover rounded"
                    />
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">
                      ৳ {item?.price?.price}
                    </span>
                    |<span className="text-gray-500">{item?.price?.weight} kg</span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                >
                  <FiTrash2 size={18} />
                </button>
                <div className="flex items-center gap-2 border border-(--primary-color-800) rounded">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    className="p-1 hover:bg-(--primary-color-600) transition cursor-pointer"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="w-6 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    className="p-1 hover:bg-(--primary-color-600) transition cursor-pointer"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t p-4 space-y-3">
        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold text-green-600">৳ {total}</span>
        </div>

        {/* Saved */}
        {saved > 0 && (
          <div className="text-sm">
            <span className="text-gray-600">Saved: </span>
            <span className="font-semibold text-green-600">৳ {saved}</span>
          </div>
        )}

        {/* Checkout Button */}
        <Link href={"/checkout"}>
          <button
            onClick={handleOnCloseAfterCheckoutFn}
            disabled={cartItems.length === 0}
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
