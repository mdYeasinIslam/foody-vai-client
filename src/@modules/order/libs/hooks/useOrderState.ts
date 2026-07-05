import { useSocket } from "@/src/@libs/socket/hooks/useSocket";
import { useAuthState } from "@/src/@modules/auth/libs/hooks/useAuthState";
import { useCartState } from "@/src/@modules/cart/libs/hooks/useCartState";
import {
  useCancelOrder,
  useGetAllOrders,
  useOrderUpdates,
  usePlaceOrder,
} from "@/src/@modules/order/libs/hooks";
import { IOrderCreate, IOrderInfo } from "@/src/@modules/order/libs/interface";
import { MessageInstance } from "antd/es/message/interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useOrderState = (messageApi?: MessageInstance) => {
  const { socket } = useSocket();
  const { user } = useAuthState(messageApi);
  const router = useRouter();
  const { clearCart, setCart } = useCartState();

  const [orders, setOrders] = useState<IOrderInfo[]>([]);

  // --------------------------------------------------------
  // 1. GET ALL ORDERS LOGIC
  // --------------------------------------------------------
  const {
    data,
    response: getOrderResponse,
    isError,
    isPending: isGetAllOrdersPending,
    errorMessage,
    refetch, // 🟢 pass this through if your useGetAllOrders exposes it (e.g. react-query).
    // If it doesn't exist on your hook, remove this destructure and the
    // `refetch` return below — `refresh()` will just no-op instead.
  } = useGetAllOrders() as ReturnType<typeof useGetAllOrders> & {
    refetch?: () => void;
  };

  // 🟢 FIX: previously `orders` was only ever populated by placeOrder /
  // cancelOrder / socket updates — the initial fetch from useGetAllOrders
  // was never written into state, so the admin table would always start
  // empty. Adjust `data?.data` below to match whatever shape your
  // useGetAllOrders hook actually resolves to.
  useEffect(() => {
    if (getOrderResponse?.success && data) {
      setOrders(data || []);
    }
  }, [data]);

  // 2. PLACE ORDER LOGIC
  const {
    mutate: placeMutate,
    mutateAsync: placeMutateAsync,
    isPending: isPlacing,
    variables: placeVariables,
  } = usePlaceOrder({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi?.error(res.message || "Failed to place order");
          return;
        }

        clearCart();
        setOrders((prev) => [res?.data as any, ...prev]);
        setCart([]);
        messageApi?.success(res.message);

        router.push(`/order-track/${res?.data?.data?.orderId}`);
      },
      onError: (err) => messageApi?.error(err.message),
    },
  });

  // 3. CANCEL ORDER LOGIC
  // 🟡 NOTE: this is the only status-changing mutation this hook has.
  // There is no generic "update status to confirmed/delivered" mutation,
  // and no delete-order mutation. The admin page's status/delete actions
  // are wired against this limitation — see useAdminOrdersPage.ts.
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

  // 4. LIVE SUBSCRIPTION UPDATES
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
    getOrderResponse,
    placeOrder,
    placeOrderAsync: placeMutateAsync,
    cancelOrder,
    refetch, // 🟢 new — may be undefined, guard on the consuming side
    isPlacing,
    isCancelling,
    isGetAllOrdersPending,
    isError,
    errorMessage,
    placeVariables,
    data,
  };
};
