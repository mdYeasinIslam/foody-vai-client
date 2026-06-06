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
import { MessageInstance } from "antd/es/message/interface";
import useGlobalState from "../../../../@libs/hooks/useGlobalState";
import { useAuthState } from "@/src/@modules/auth/libs/hooks/useAuthState";
import { IAuthUser } from "@/src/@modules/auth/libs/interface";

// useCartState.ts
export const useCartState = (messageApi?: MessageInstance) => {
  const { user } = useAuthState(messageApi);
  const [cart, setCart] = useGlobalState<ICartItem[]>({
    key: "cart",
    initialValue: [],
  });
  const { data, refetch } = useCartProducts({});
  const cartProductsFromDB = data?.data;

  //create (add to cart)
  const {
    mutate: createMutate,
    mutateAsync: createMutateAsync,
    isPending: isCreating,
    variables: createVariables,
  } = useCreateCartProduct({
    config: {
      onSuccess: async (data) => {
        if (!data?.alreadyExist && data?.success) {
          setCart((prev) => [...prev, data?.data]);
          await refetch();
          messageApi?.success("Product added to the cart successfully");
        } else if (data?.alreadyExist && data?.success) {
          setCart((prev) =>
            prev.map((item) =>
              item.productId === data.data.productId &&
              item.price?.weight === data.data.price?.weight
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          );
          await refetch();
          messageApi?.success(data?.message || "Product quantity updated");
        } else {
          messageApi?.error(
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
      onSuccess: async (data: ICartItemResponse) => {
        if (data?.success && !data?.deleted) {
          setCart((prev) =>
            prev.map((item) =>
              item.productId === data.data.productId &&
              item.price?.weight === data.data.price?.weight
                ? { ...item, quantity: data.data.quantity }
                : item,
            ),
          );
          await refetch();
          messageApi?.success(data?.message || "Quantity updated");
        } else if (data?.deleted) {
          setCart((prev) =>
            prev.filter((item) => item?._id !== data.cartItemId),
          );
          await refetch();
          messageApi?.success(data?.message || "Product removed from cart");
        } else {
          messageApi?.error(data?.message || "Failed to update quantity");
        }
      },
    },
  });
  //delete single item
  const { mutate: deleteMutateSingleItem } = useDeleteCartProduct({
    config: {
      onSuccess: async (data) => {
        if (!data?.success) {
          messageApi?.error(data?.message || "Failed to clear cart");
          return;
        }
        // setCart(cartItems.filter((item) => item._id !== data.cartItemId));
        setCart((prev) => prev.filter((item) => item._id !== data.cartItemId));
        await refetch();
        messageApi?.success("Cart item deleted successfully");
        // refetch();
      },
    },
  });
  // delete all item
  const { mutate: deleteMutate } = useDeleteAllCartProducts({
    config: {
      onSuccess: async (data) => {
        if (!data?.success) {
          messageApi?.error(data?.message || "Failed to clear cart");
          return;
        }
        setCart([]);
        await refetch();
        messageApi?.success("Cart cleared successfully");
      },
    },
  });

  const addToCart = async (payload: Omit<ICartItemCreate, "_id">) => {
    if (user && user.email) {
      payload.userId = user._id;
      createMutate(payload);
      return;
    }
    const existingItem = cart.find(
      (item) =>
        item.productId === payload.productId &&
        item.price?.weight === payload.price?.weight,
    );
    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === payload.productId &&
          item.price?.weight === payload.price?.weight
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
      return;
    }
    setCart((prev) => [...prev, { ...payload, quantity: 1 }]);
  };

  // Sync guest cart items to DB on login
  const syncGuestCartToDB = async (userInfo: IAuthUser) => {
    if (!cart.length || !userInfo?._id) {
      return;
    }
    const filterByUserId = cart.filter((item) => item?.userId == null);
    try {
      if(filterByUserId?.length<=0)return
      await Promise.all(
        filterByUserId?.map((item) => {
          const payload = {
            ...item,
            userId: userInfo?._id,
          };
          return createMutateAsync(payload);
        }),
      );
      await refetch();
      // console.log("after sync", data);
      // setCart()
      // messageApi?.success("Cart synced successfully");
    } catch (error) {
      console.log(error);
      messageApi?.error("Failed to sync cart");
    }
  };

  const updateCartItemQuantity = (
    payload: Omit<ICartItemUpdate, "_id">,
    action: string,
  ) => {
    if (user && user.email) {
      updateMutate({ ...payload, action: action });
      return;
    }

    setCart((prev) => {
      return prev
        .map((item) =>
          item.productId === payload.productId &&
          item.price?.weight === payload.price?.weight
            ? {
                ...item,
                quantity:
                  action === "increment"
                    ? item.quantity + 1
                    : item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const removeSingleItem = (item: ICartItem) => {
    if (user && user.email && item._id) {
      deleteMutateSingleItem(item._id);
      return;
    }
    setCart((prev) => prev.filter((i) => i.productId !== item.productId));
  };
  const clearCart = () => {
    if (user && user.email) {
      deleteMutate(undefined);
      return;
    }
    setCart([]);
  };
  return {
    cart,
    setCart,
    isCreating,
    isUpdating,
    createVariables, // { productId, price.weight, ... } of in-flight create
    updateVariables, // { productId, price.weight, ... } of in-flight update
    addToCart,
    updateCartItemQuantity,
    removeSingleItem,
    clearCart,
    cartProductsFromDB,
    syncGuestCartToDB,
  };
};
