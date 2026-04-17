import React from "react";
import { ClassNameValue } from "tailwind-merge";
import { IProduct } from "../libs/interfaces";
import Image from "next/image";
interface IProps {
    className?: ClassNameValue;
    product : IProduct
}
const Product: React.FC<IProps> = ({ className ,product}) => {
  return (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow hover:shadow-lg transition"
    >
      <div className="relative bg-gray-100 h-48 flex items-center justify-center overflow-hidden rounded-t-lg">
        {/* {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    <div>{product.discount}%</div>
                    <div>OFF</div>
                    </div>
                  )} */}
        <Image
          src={product.img}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-green-600 text-xl font-bold">
          +
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-600">
            ৳{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ৳{product.originalPrice}
            </span>
          )}
        </div>
        {product.weight && (
          <div className="flex gap-2">
            {product.weight?.map((w) => (
              <button
                key={w}
                className="text-xs border border-green-500 text-green-600 px-3 py-1 rounded hover:bg-green-50"
              >
                {w}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
