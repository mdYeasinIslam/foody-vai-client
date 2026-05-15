import {
  useCartProducts,
  useCreateCartProduct,
  useDeleteAllCartProducts,
  useDeleteCartProduct,
  useUpdateCartProduct,
} from "@/src/@modules/cart/libs/hooks";
import {
  ICartItem,
  ICartItemCreate,
  ICartItemResponse,
  ICartItemUpdate,
} from "@/src/@modules/cart/libs/interfaces";
import { message } from "antd";
import useGlobalState from "../../../../@libs/hooks/useGlobalState";

// useCartState.ts
export const useCartState = () => {
  const [cart, setCart] = useGlobalState<ICartItem[]>({
    key: "cart",
    initialValue: [],
  });
  const [messageApi, contextHolder] = message.useMessage();
  const { data } = useCartProducts({});
  const cartProducts = data?.data;
  //create (add to cart)
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
  //update
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
  //delete single item
  const { mutate: deleteMutateSingleItem } = useDeleteCartProduct({
    config: {
      onSuccess: (data) => {
        console.log(data);
        if (!data?.success) {
          messageApi.error(data?.message || "Failed to clear cart");
          return;
        }
        console.log("delete product", data);
        // setCart(cartItems.filter((item) => item._id !== data.cartItemId));
        setCart((prev) => prev.filter((item) => item._id !== data.cartItemId));
        messageApi.success("Cart item deleted successfully");
      },
    },
  });
  // delete all item
  const { mutate: deleteMutate } = useDeleteAllCartProducts({
    config: {
      onSuccess: (data) => {
        console.log(data);
        if (!data?.success) {
          messageApi.error(data?.message || "Failed to clear cart");
          return;
        }
        console.log("delete all");
        setCart([]);
        messageApi.success("Cart cleared successfully");
      },
    },
  });
  const addToCart = (payload: Omit<ICartItemCreate, "_id">) => {
    createMutate(payload);
  };

  const updateCartItemQuantity = (
    payload: Omit<ICartItemUpdate, "_id">,
    action: string,
  ) => {
    updateMutate({ ...payload, action: action });
  };

  const removeSingleItem = (id: string) => {
    deleteMutateSingleItem(id);
  };
  const clearCart = () => {
    deleteMutate(undefined);
  };
  // ✅ expose variables so each card can check if IT is loading
  return {
    cart,
    isCreating,
    isUpdating,
    createVariables, // { productId, price.weight, ... } of in-flight create
    updateVariables, // { productId, price.weight, ... } of in-flight update
    addToCart,
    updateCartItemQuantity,
    removeSingleItem,
    clearCart,
    contextHolder,
    cartProducts,
  };
};
