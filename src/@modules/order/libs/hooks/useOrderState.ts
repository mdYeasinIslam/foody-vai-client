// @modules/order/libs/hooks/useOrderState.ts
import { MessageInstance } from "antd/es/message/interface";
import { useAuthState } from "@/src/@modules/auth/libs/hooks/useAuthState";
import useGlobalState from "@/src/@libs/hooks/useGlobalState";
import { IOrderInfo } from "../interface";
import { useCancelOrder, useOrderUpdates, usePlaceOrder } from "../hooks";

export const useOrderState = (messageApi?: MessageInstance) => {
  const { user } = useAuthState(messageApi);
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
        if (res.success && res.data) {
          setOrders((prev) => [res.data as any, ...prev]);
          messageApi?.success(res.message || "Order placed successfully");
        } else {
          messageApi?.error(res.message || "Failed to place order");
        }
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
              o._id === res.data?._id ? { ...o, status: "cancelled" } : o,
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

  const placeOrder = (checkoutInfo: IOrderInfo) => {
    if (!user?._id) {
      messageApi?.error("Please login to place an order");
      return;
    }
    placeMutate({ ...checkoutInfo, userId: user._id });
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
