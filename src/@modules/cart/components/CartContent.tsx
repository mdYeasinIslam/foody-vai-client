import React from "react";
import { ClassNameValue } from "tailwind-merge";
import { FiTrash2, FiPlus, FiMinus, FiX } from "react-icons/fi";
import cn from "@/src/@libs/utils/_cn";
import Image from "next/image";
import { ICartItem } from "../libs/interfaces";


interface IProps {
    className?: ClassNameValue;
    cartItems: ICartItem[];
}

const CartContent: React.FC<IProps> = ({ className,cartItems }) => {
  // Mock data - replace with actual data 

  const total = 3616;
  const saved = 214;

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-gray-600">
            <FiTrash2 size={20} />
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3 border-b pb-4">
            {/* Product Image */}
            <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
              {item.img && (
                <Image
                  src={item.img}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-green-600 font-bold">৳ {item.price}</p>
              <p className="text-gray-500 text-xs">{item.weight}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end justify-between">
              <button className="text-gray-400 hover:text-red-500">
                <FiTrash2 size={18} />
              </button>
              <div className="flex items-center gap-2 border rounded">
                <button className="p-1 hover:bg-gray-100">
                  <FiMinus size={16} />
                </button>
                <span className="w-6 text-center text-sm">{item.quantity}</span>
                <button className="p-1 hover:bg-gray-100">
                  <FiPlus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t p-4 space-y-3">
        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold text-green-600">৳ {total}</span>
        </div>

        {/* Saved */}
        <div className="text-sm">
          <span className="text-gray-600">Saved: </span>
          <span className="font-semibold text-green-600">৳ {saved}</span>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition">
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default CartContent;
