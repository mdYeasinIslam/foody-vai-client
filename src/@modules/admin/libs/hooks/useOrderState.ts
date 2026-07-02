import { useAuthState } from "@/src/@modules/auth/libs/hooks/useAuthState";
import { MessageInstance } from "antd/es/message/interface";
import { useCancelOrder, useOrderUpdates, usePlaceOrder } from "../hooks";
import { IOrderCreate, IOrderInfo } from "../interface";
import { useCartState } from "@/src/@modules/cart/libs/hooks/useCartState";
import { useRouter } from "next/navigation";
import useGlobalState from "@/src/@libs/hooks/useGlobalState";

export const useOrderState = (messageApi?: MessageInstance) => {
  const { user } = useAuthState(messageApi);
  const router = useRouter();
  const { clearCart, setCart } = useCartState();
  const [orders, setOrders] = useGlobalState<IOrderInfo[]>({
    key: "orders",
    initialValue: [],
  });

  // place order
  const {
    mutate: placeMutate,
    mutateAsync: placeMutateAsync,
    isPending: isPlacing,
    variables: placeVariables,
  } = usePlaceOrder({
    config: {
      onSuccess: (res) => {
        console.log(res.data);

        if (!res.success) {
          messageApi?.error(res.message || "Failed to place order");
          return;
        }
        messageApi?.loading("Placing order...").then(() => {
          clearCart();
          
          setOrders((prev) => [...prev, res?.data as any]);
          setCart([]);

          messageApi?.success(res.message);
          router.push(`/order-track/${res?.orderData?.orderId}`);
        });
      },
      onError: (err) => messageApi?.error(err.message),
    },
  });

  // cancel order
  const { mutate: cancelMutate, isPending: isCancelling } = useCancelOrder({
    config: {
      onSuccess: (res) => {
        if (res.success) {
          setOrders((prev) =>
            prev.map((o) =>
              o._id === res.data?.data?._id ? { ...o, status: "cancelled" } : o,
            ),
          );
          messageApi?.success("Order cancelled");
        }
      },
      onError: (err) => messageApi?.error(err.message),
    },
  });

  // live updates from server
  useOrderUpdates((updated) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === updated._id ? { ...o, ...updated } : o)),
    );
    messageApi?.info(`Order ${updated._id} updated: ${updated.status}`);
  });

  const placeOrder = (checkoutInfo: IOrderCreate) => {
    if (!user?._id) {
      messageApi?.error("Please login to place an order");
      return;
    }
    placeMutate({ ...checkoutInfo });
  };

  const cancelOrder = (orderId: string) => cancelMutate(orderId);

  return {
    orders,
    placeOrder,
    placeOrderAsync: placeMutateAsync,
    cancelOrder,
    isPlacing,
    isCancelling,
    placeVariables,
  };
};
