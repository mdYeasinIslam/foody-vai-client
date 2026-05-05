"use client";
import useGlobalState from "@/src/@libs/hooks/useGlobalState";
import cn from "@/src/@libs/utils/_cn";
import { LocalStorage } from "@/src/@libs/utils/localStorage";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { ClassNameValue } from "tailwind-merge";
import { IProduct, IProductCreate } from "../libs/interfaces";
import { FaCirclePlus } from "react-icons/fa6";
interface IProps {
  className?: ClassNameValue;
  product: IProduct;
}
const Product: React.FC<IProps> = ({ className, product }) => {
  const [weightForPrice, setWeightForPrice] = useState<null | number>(null);
  const [cart, setCart] = useGlobalState<IProductCreate[]>({
    key: "cart",
    initialValue: [],
  });
  console.log(cart);
  const price = product?.prices?.filter(
    (price) => price.weight === weightForPrice,
  );
  const originalPrice = product?.prices?.filter(
    (price) => price.weight === weightForPrice,
  );
  const badgeCount = useMemo(() => {
    const productInCart = cart.find((item) => item.id === product.id);
    return productInCart ? productInCart.quantity : 0;
  }, [cart, product.id]);

  const addToCart = () => {
    let updatedCart;
    try {
      const existingCart = LocalStorage.get<IProductCreate[]>("cart", []);

      const selectedWeight = weightForPrice ?? product.prices?.[0]?.weight;

      const selectedPriceObj =
        product.prices?.find((p) => p.weight === selectedWeight) ??
        product.prices?.[0];

      if (!selectedPriceObj) return;

      const existingItem = existingCart.find(
        (item: IProductCreate) =>
          item?.id === product.id && item?.weight === selectedPriceObj.weight,
      );

      if (existingItem) {
        updatedCart = existingCart.map((item) =>
          item.id === product.id && item.weight === selectedPriceObj.weight
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        const newItem = {
          id: product.id,
          name: product.name,
          img: product.img,
          weight: selectedPriceObj.weight,
          price: selectedPriceObj.price,
          originalPrice: selectedPriceObj.originalPrice ?? null,
          quantity: 1,
          category: product.category,
          createdAt: new Date().toISOString(),
        };
        updatedCart = [...existingCart, newItem];
      }

      // ✅ Save to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // ✅ Update global state (THIS IS KEY)
      setCart(updatedCart);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      key={product.id}
      className={cn(
        className,
        "h-full flex flex-col  bg-white rounded-lg shadow hover:shadow-lg",
      )}
    >
      <div className="relative bg-gray-100 h-48 flex items-center justify-center overflow-hidden rounded-t-lg">
        <Image
          src={product.img}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
        <Badge
          onClick={addToCart}
          count={badgeCount}
          size="small"
          offset={[-2, 2]}
          className=" absolute! bottom-2! right-2!"
        >
          <FaCirclePlus className="w-7 h-7 text-green-600 cursor-pointer " />
        </Badge>
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
