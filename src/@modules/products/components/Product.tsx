'use client'
import React, { useState } from "react";
import { ClassNameValue } from "tailwind-merge";
import { IProduct } from "../libs/interfaces";
import Image from "next/image";
import cn from "@/src/@libs/utils/_cn";
interface IProps {
  className?: ClassNameValue;
  product: IProduct;
}
const Product: React.FC<IProps> = ({ className, product }) => {
const [weightForPrice,setWeightForPrice] = useState<null | number>(null)
  const price = product?.prices?.filter((price) => price.weight === weightForPrice);
  const originalPrice = product?.prices?.filter((price) => price.weight === weightForPrice);
  console.log(price);

  const addToCart = () => {
    try {
      const key = "cart";
      const getCart = localStorage.getItem(key);
      const cart: any[] = getCart ? JSON.parse(getCart) : [];

      const selectedWeight =
        weightForPrice !== null
          ? weightForPrice
          : product.prices && product.prices.length
          ? product.prices[0].weight
          : undefined;

      const selectedPriceObj =
        product.prices?.find((p) => p.weight === selectedWeight) ??
        product.prices?.[0];

      if (!selectedPriceObj) {
        console.error("No price information available for product", product.id);
        return;
      }

      const existingItem = cart.find(
        (item) => item.id === product.id && item.weight === selectedPriceObj.weight
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const cartItem = {
          id: product.id,
          name: product.name,
          img: product.img,
          weight: selectedPriceObj.weight,
          price: selectedPriceObj.price,
          originalPrice: selectedPriceObj.originalPrice ?? null,
          quantity: 1,
          addedAt: new Date().toISOString(),
        };
        cart.push(cartItem);
      }

      localStorage.setItem(key, JSON.stringify(cart));
      console.log("Product added to cart");
    } catch (err) {
      console.error("Failed to add product to cart", err);
    }
  };
  return (
    <div
      key={product.id}
      className={cn(className,
        "h-full flex flex-col  bg-white rounded-lg shadow hover:shadow-lg",
      )}
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
        <button onClick={addToCart} className="absolute bottom-2 right-2 bg-(--primary-color-800) text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-600 text-xl font-bold cursor-pointer">
          +
        </button>
      </div>
      <div className="p-4 flex flex-col justify-between flex-1">
        <h3 className="font-semibold text-gray-800 mb-">{product.name}</h3>
        <div className="mt-0">
          <div className="flex items-center  gap-2 mb-">
            <span className="text-lg font-bold text-green-600">
              ৳{price[0]?.price ? price[0]?.price : product.prices[0].price}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ৳
                {originalPrice[0]?.price
                  ? originalPrice[0]?.originalPrice
                  : product.prices[0].originalPrice}
              </span>
            )}
          </div>
          {product?.prices && (
            <div className="flex gap-2">
              {product?.prices?.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => setWeightForPrice(w.weight)}
                  className={cn(
                    "text-xs border border-(--primary-color-800) text-black px-3 py-1 rounded hover:bg-green-50 cursor-pointer",
                    {
                      "bg-(--primary-color-600) text-(--primary-color-800) ":
                        (weightForPrice === null && idx == 0) ||
                        weightForPrice === w.weight,
                    },
                  )}
                >
                  {w.weight}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
