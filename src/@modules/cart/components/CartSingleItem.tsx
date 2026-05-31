import Image from "next/image";
import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { ClassNameValue } from "tailwind-merge";
import { ICartItem } from "../libs/interfaces";
import cn from "@/src/@libs/utils/_cn";
interface IProps {
  className?: ClassNameValue;
  item: ICartItem;
  handleDeleteItemFn: (item: ICartItem) => void;
  handleQuantityChangeFn: (item: ICartItem, action: string) => void;
}
const CartSingleItem: React.FC<IProps> = ({
  className,
  item,
  handleDeleteItemFn,
  handleQuantityChangeFn,
}) => {
  return (
    <div className={cn(className, "flex justify-between border-b pb-1")}>
      <div className="flex items-center gap-3">
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

      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => handleDeleteItemFn(item)}
          className="text-gray-400 hover:text-red-500 transition cursor-pointer"
        >
          <FiTrash2 size={18} />
        </button>
        <div className="flex items-center gap-2 border border-(--primary-color-800) rounded">
          <button
            onClick={() => handleQuantityChangeFn(item, "decrement")}
            className="p-1 hover:bg-(--primary-color-600) transition cursor-pointer"
          >
            <FiMinus size={16} />
          </button>
          <span className="w-6 text-center text-sm">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChangeFn(item, "increment")}
            className="p-1 hover:bg-(--primary-color-600) transition cursor-pointer"
          >
            <FiPlus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSingleItem;
