"use client";
import { AxiosInstance } from "@/src/@libs/config/AxiosInstance";
import useGlobalState from "@/src/@libs/hooks/useGlobalState";
import cn from "@/src/@libs/utils/_cn";
import { Badge, message } from "antd";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { ClassNameValue } from "tailwind-merge";
import {
  useCreateCartProduct,
  useUpdateCartProduct,
} from "../../cart/libs/hooks";
import { ICartItemCreate } from "../../cart/libs/interfaces";
import { IProduct } from "../libs/interfaces";
interface IProps {
  className?: ClassNameValue;
  product: IProduct;
  cart: ICartItemCreate[];
  setCart: (
    value: ICartItemCreate[] | ((val: ICartItemCreate[]) => ICartItemCreate[]),
  ) => void;
}
const ProductCopy: React.FC<IProps> = ({
  className,
  product,
  cart,
  setCart,
}) => {
  const [selectedWeight, setSelectedWeight] = useState<number>(
    product.prices?.[0]?.weight ?? 0,
  );
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate } = useCreateCartProduct({
    config: {
      onSuccess: async (data) => {
        if (!data?.success) {
          messageApi.error(
            data?.message || "Failed to add product to the cart",
          );
          return;
        } else if (data?.success && data?.alreadyExist) {
          setCart((prev) =>
            prev.map((item) =>
              item.productId === product._id &&
              item.price?.weight === selectedWeight
            ? { ...item, quantity: item.quantity + 1 }
            : item,
            ),
          );
          messageApi.success(data?.message || "Product quantity updated");
        } else {
          setCart((prev) => [...prev, data?.data]);
          messageApi.success("Product added to the cart successfully");
        }
      },
    },
  });
  const { mutate: updateMutate } = useUpdateCartProduct({
    config: {
          onSuccess: (data) => {
            
        if (data?.success && !data?.deleted) {
          setCart((prev) =>
            prev.map((item) =>
              item.productId === product._id &&
              item.price?.weight === selectedWeight
                ? { ...item, quantity: data.data.quantity }
                : item,
            ),
          );
          messageApi.success(data?.message || "Quantity updated");
        } else if (data?.deleted) {
          setCart((prev) =>
            prev.filter((item) => item?._id !== data.cartItemId),
          );
          messageApi.success(data?.message || "Product removed from cart");
        } else {
          messageApi.error(data?.message || "Failed to update quantity");
        }
      },
    },
  });
  const selectedPriceObj = useMemo(
    () =>
      product.prices?.find((p) => p.weight === selectedWeight) ??
      product.prices?.[0],
    [product.prices, selectedWeight],
  );
  // ---------------------------------------------------------------------
  const priceByWeight = product?.prices?.filter(
    (price) => price.weight === selectedWeight,
  );
  const originalPriceByWeight = product?.prices?.filter(
    (price) => price.weight === selectedWeight,
  );
  const badgeCount = useMemo(() => {
    const productInCart = cart.find((item) => item?.productId === product._id);
    return productInCart ? productInCart.quantity : 0;
  }, [cart, product._id]);

  const handleAddToCartFn = async () => {
    try {
      const payload = {
        productId: product._id,
        name: product.name,
        description: product.description,
        img: product.img,
        price: selectedPriceObj,
        quantity: 1,
        category: product.category,
        subCategory: product.subcategory,
      };
      mutate(payload);
    } catch (err) {
      console.error(err);
    }
  };
  const handleRemoveFn = async () => {
    try {
      const payload = {
        productId: product._id,
        action: "decrement",
        name: product.name,
        description: product.description,
        img: product.img,
        price: selectedPriceObj,
        quantity: 1,
        category: product.category,
        subCategory: product.subcategory,
      };
      console.log(payload);
      updateMutate(payload);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      key={product._id}
      className={cn(
        className,
        "h-full flex flex-col  bg-white rounded-lg shadow hover:shadow-lg",
      )}
    >
      {contextHolder}
      <div className="relative bg-gray-100 h-48 flex items-center justify-center overflow-hidden rounded-t-lg">
        <Image
          src={product?.img}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
        <Badge
          onClick={handleAddToCartFn}
          count={badgeCount}
          size="small"
          offset={[-2, 2]}
          className=" absolute! bottom-2! right-2!"
        >
          <FaCirclePlus className="w-7 h-7 text-green-600 cursor-pointer" />
        </Badge>
        {badgeCount > 0 && (
          <button
            // onClick={() => {
            //   // handle remove from cart logic
            //   const existingCart = LocalStorage.get<IProductCreate[]>(
            //     "cart",
            //     [],
            //   );
            //   // const selectedWeight =
            //   //   selectedWeight ?? product.prices?.[0]?.weight;
            //   const updatedCart = existingCart
            //     .map((item) =>
            //       item._id === product._id && item?.price?.weight === selectedWeight
            //         ? { ...item, quantity: item.quantity - 1 }
            //         : item,
            //     )
            //     .filter((item) => item.quantity > 0);
            //   localStorage.setItem("cart", JSON.stringify(updatedCart));
            //   setCart(updatedCart);
            // }}
            onClick={handleRemoveFn}
            className="absolute bottom-2 left-2"
          >
            <FaCircleMinus className="w-7 h-7 text-red-600 cursor-pointer" />
          </button>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-1">
        <h3 className="font-semibold text-gray-800 mb-">{product.name}</h3>
        <div className="mt-0">
          <div className="flex items-center  gap-2 mb-">
            <span className="text-lg font-bold text-green-600">
              ৳
              {priceByWeight[0]?.price
                ? priceByWeight[0]?.price
                : product.prices[0].price}
            </span>
            {originalPriceByWeight && (
              <span className="text-sm text-gray-500 line-through">
                ৳
                {originalPriceByWeight[0]?.price
                  ? originalPriceByWeight[0]?.originalPrice
                  : product.prices[0].originalPrice}
              </span>
            )}
          </div>
          {product?.prices && (
            <div className="flex gap-2">
              {product?.prices?.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedWeight(w.weight)}
                  className={cn(
                    "text-xs border border-(--primary-color-800) text-black px-3 py-1 rounded hover:bg-green-50 cursor-pointer",
                    {
                      "bg-(--primary-color-600) text-(--primary-color-800) ":
                        (selectedWeight === null && idx == 0) ||
                        selectedWeight === w.weight,
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

export default ProductCopy;
