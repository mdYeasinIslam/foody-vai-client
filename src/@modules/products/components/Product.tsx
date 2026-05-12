"use client";
import useGlobalState from "@/src/@libs/hooks/useGlobalState";
import cn from "@/src/@libs/utils/_cn";
import { LocalStorage } from "@/src/@libs/utils/localStorage";
import { Badge, message } from "antd";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { ClassNameValue } from "tailwind-merge";
import { IProduct, IProductCreate } from "../libs/interfaces";
import {
  useCreateCartProduct,
  useUpdateCartProduct,
} from "../../cart/libs/hooks";
import { ICartItemCreate } from "../../cart/libs/interfaces";
import { AxiosInstance } from "@/src/@libs/config/AxiosInstance";
interface IProps {
  className?: ClassNameValue;
  product: IProduct;
}
async function apiUpdateQuantity(
  cartItemId: string,
  action: "increment" | "decrement",
) {
  const res = await fetch(`${AxiosInstance}/${cartItemId}/quantity`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
  return res.json();
}
const Product: React.FC<IProps> = ({ className, product }) => {
  const [selectedWeight, setSelectedWeight] = useState<number>(
    product.prices?.[0]?.weight ?? 0,
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useGlobalState<ICartItemCreate[]>({
    key: "cart",
    initialValue: [],
  });
  // const { mutate: updateMutate } = useUpdateCartProduct();
  const { mutate } = useCreateCartProduct({
    config: {
      onSuccess: async (data) => {
        if (!data?.success) {
          messageApi.error(
            data?.message || "Failed to add product to the cart",
          );
          return;
        } else if (data?.success) {
          setCart((prev) =>
            prev.map((i) =>
              i?.productId === product._id &&
              i?.price.weight === selectedWeight &&
              i._id === "pending"
                ? { ...i, _id: data?.data._id }
                : i,
            ),
          );
        } else if (data?.cartItemId) {
          // Edge case: item already existed in DB (e.g. stale local state)
          // Patch _id and increment
          setCart((prev) =>
            prev.map((i) =>
              i._id === product._id && i?.price?.weight === selectedWeight
                ? { ...i, _id: data.cartItemId }
                : i,
            ),
          );

          await apiUpdateQuantity(data.cartItemId, "increment");
          optimisticIncrement();
        } else {
          // Rollback optimistic update on failure
          optimisticDecrement();
        }

        messageApi.success("Product added to the cart successfully");
      },
    },
  });
  // Find this product+weight combo in cart
  const cartItem = useMemo(
    () =>
      cart.find(
        (i) =>
          i?.productId === product?._id && i?.price?.weight === selectedWeight,
      ),
    [cart, product._id, selectedWeight],
  );

  const quantity = cartItem?.quantity ?? 0;
  const selectedPriceObj = useMemo(
    () =>
      product.prices?.find((p) => p.weight === selectedWeight) ??
      product.prices?.[0],
    [product.prices, selectedWeight],
  );
  // ── Optimistic cart helpers ─────────────────────────────────────────────────

  /** Add item to local cart state optimistically */
  const optimisticAdd = (mongoId: string) => {
    const newItem = {
      _id: mongoId,
      productId: product._id,
      name: product.name,
      description: product.description,
      img: product.img,
      price: selectedPriceObj,
      quantity: 1,
      category: product.category,
      subCategory: product.subcategory,
    };
    setCart((prev) => [...prev, newItem]);
  };

  /** Increment quantity in local cart state */
  const optimisticIncrement = () => {
    setCart((prev) =>
      prev.map((i) =>
        i?.productId === product._id && i?.price?.weight === selectedWeight
          ? { ...i, quantity: i.quantity + 1 }
          : i,
      ),
    );
  };

  /** Decrement or remove from local cart state */
  const optimisticDecrement = () => {
    setCart((prev) =>
      prev
        .map((i) =>
          i?.productId === product._id && i?.price?.weight === selectedWeight
            ? { ...i, quantity: i?.quantity - 1 }
            : i,
        )
        .filter((i) => i?.quantity > 0),
    );
  };
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

  // const selectedWeight = selectedWeight ?? product?.prices?.[0]?.weight;

  const addToCart = async () => {
    if (loading || !selectedPriceObj) return;
    setLoading(true);

    // let updatedCart;
    try {
      // const selectedWeight = selectedWeight ?? product.prices?.[0]?.weight;

      // const selectedPriceObj =
      //   product.prices?.find((p) => p.weight === selectedWeight) ??
      //   product.prices?.[0];

      // if (!selectedPriceObj) return;

      // const existingItem = cartItem.find(
      //   (item: IProductCreate) =>
      //     item?._id === product._id &&
      //     item?.price?.weight === selectedPriceObj.weight,
      // );

      // if (existingItem) {
      //   updatedCart = existingCart.map((item) =>
      //     item.id === product._id && item.weight === selectedPriceObj.weight
      //       ? { ...item, quantity: item.quantity + 1 }
      //       : item,
      //   );
      // } else {
      //   const newItem = {
      //     productId: product._id,
      //     name: product.name,
      //     img: product.img,
      //     // weight: selectedPriceObj.weight,
      //     // price: selectedPriceObj.price,
      //     // originalPrice: selectedPriceObj.originalPrice ?? null,
      //     price: {
      //       price: selectedPriceObj.price,
      //       weight: selectedPriceObj.weight,
      //       originalPrice: selectedPriceObj.originalPrice ?? null,
      //     },
      //     quantity: 1,
      //     category: product.category,
      //     createdAt: new Date().toISOString(),
      //   };
      //   updatedCart = [...existingCart, newItem];
      // }

      // // ✅ Save to localStorage
      // localStorage.setItem("cart", JSON.stringify(updatedCart));

      // // ✅ Update global state (THIS IS KEY)
      // setCart(updatedCart);

      if (!selectedPriceObj) return;
      if (!cartItem) {
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
        optimisticAdd("pending");
        mutate(payload);
      } else {
        // ── Subsequent clicks: PATCH to increment ──
        if (!cartItem._id || cartItem._id === "pending") return; // wait for POST to finish

        optimisticIncrement(); // optimistic

        const result = await apiUpdateQuantity(cartItem._id, "increment");
        if (!result.success) {
          optimisticDecrement(); // rollback
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleRemove = async () => {
    if (loading || !cartItem?._id || cartItem._id === "pending") return;
    setLoading(true);

    // Optimistic decrement immediately
    optimisticDecrement();

    try {
      const result = await apiUpdateQuantity(cartItem._id, "decrement");
      if (!result.success && !result.deleted) {
        optimisticIncrement(); // rollback
      }
    } catch (err) {
      console.error(err);
      optimisticIncrement(); // rollback
    } finally {
      setLoading(false);
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
          onClick={addToCart}
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
            onClick={handleRemove}
            disabled={loading}
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

export default Product;
