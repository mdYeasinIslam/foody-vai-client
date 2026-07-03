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
import { useEffect, useState, useCallback } from "react";

export const useOrderState = (messageApi?: MessageInstance) => {
  const { socket } = useSocket();
  const { user } = useAuthState(messageApi);
  const router = useRouter();
  const { clearCart, setCart } = useCartState();

  // 🟢 CHANGED: Replaced useGlobalState with normal local React useState
  const [orders, setOrders] = useState<IOrderInfo[]>([]);

  // Local UI states for the fetching pipeline
  const [isPending, setIsPending] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // --------------------------------------------------------
  // 1. GET ALL ORDERS LOGIC
  // --------------------------------------------------------
  const { mutateAsync: fetchAllOrdersRaw } = useGetAllOrders();

  const loadAdminOrders = useCallback(async () => {
    if (!socket) return;
    setIsPending(true);
    setIsError(false);
    setErrorMessage(null);

    try {
      const res = await fetchAllOrdersRaw();

      if (res && res.success) {
        console.log("Fetched orders successfully:", res.data);
        setOrders(res.data || []);
      } else {
        setErrorMessage(res?.message || "Failed to fetch orders.");
      }
    } catch (err: any) {
      setIsError(true);
      console.error("Fetch error captured:", err);
      setErrorMessage(err?.message || "An unexpected error occurred.");
    } finally {
      setIsPending(false);
      setIsError(false);
    }
  }, [socket, fetchAllOrdersRaw]);

  // Safety trigger: Wait for connection before firing the request
  useEffect(() => {
    if (!socket) return;

    if (socket.connected) {
      loadAdminOrders();
    } else {
      socket.on("connect", loadAdminOrders);
    }

    return () => {
      socket.off("connect", loadAdminOrders);
    };
  }, [socket, loadAdminOrders]);

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
        // Adds the new order right into your local state array instantly
        setOrders((prev) => [res?.data as any, ...prev]);
        setCart([]);
        messageApi?.success(res.message);

        router.push(`/order-track/${res?.data?.data?.orderId}`);
      },
      onError: (err) => messageApi?.error(err.message),
    },
  });

  // 3. CANCEL ORDER LOGIC
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
    orders, // Directly returned react state array
    placeOrder,
    placeOrderAsync: placeMutateAsync,
    cancelOrder,
    refetchOrders: loadAdminOrders,
    isPlacing,
    isCancelling,
    isPending, // True while socket is connecting/fetching
    isError,
    errorMessage,
    placeVariables,
  };
};
