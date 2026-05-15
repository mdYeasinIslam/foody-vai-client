import { useCartProducts, useCreateCartProduct, useUpdateCartProduct } from "@/src/@modules/cart/libs/hooks";
import { ICartItemCreate, ICartItemResponse, ICartItemUpdate } from "@/src/@modules/cart/libs/interfaces";
import { message } from "antd";
import useGlobalState from "./useGlobalState";

// useCartState.ts
export const useCartState = () => {
  const [cart, setCart] = useGlobalState<ICartItemCreate[]>({
    key: "cart",
    initialValue: [],
  });
  const [messageApi, contextHolder] = message.useMessage();
  const { data } = useCartProducts({});
  const cartProducts = data?.data;

  const {
    mutate: createMutate,
    isPending: isCreating,
    variables: createVariables,
  } = useCreateCartProduct({
    config: {
      onSuccess: async (data) => {
        if (!data?.alreadyExist && data?.success) {
          setCart((prev) => [...prev, data?.data]);
          messageApi.success("Product added to the cart successfully");
        } else if (data?.alreadyExist && data?.success) {
          setCart((prev) =>
            prev.map((item) =>
              item.productId === data.data.productId &&
              item.price?.weight === data.data.price?.weight
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          );
          messageApi.success(data?.message || "Product quantity updated");
        } else {
          messageApi.error(
            data?.message || "Failed to add product to the cart",
          );
        }
      },
    },
  });

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    variables: updateVariables,
  } = useUpdateCartProduct({
    config: {
      onSuccess: (data: ICartItemResponse) => {
        if (data?.success && !data?.deleted) {
          setCart((prev) =>
            prev.map((item) =>
              item.productId === data.data.productId &&
              item.price?.weight === data.data.price?.weight
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

  const addToCart = (payload: Omit<ICartItemCreate, "_id">) => {
    createMutate(payload);
  };

  const removeFromCart = (payload: Omit<ICartItemUpdate, "_id">) => {
    updateMutate({ ...payload, action: "decrement" });
  };

  // ✅ expose variables so each card can check if IT is loading
  return {
    cart,
    isCreating,
    isUpdating,
    createVariables, // { productId, price.weight, ... } of in-flight create
    updateVariables, // { productId, price.weight, ... } of in-flight update
    addToCart,
    removeFromCart,
    contextHolder,
    cartProducts,
  };
};
