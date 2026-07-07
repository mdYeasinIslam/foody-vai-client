import { useAuthState } from "@/src/@modules/auth/libs/hooks/useAuthState";
import { useCartState } from "@/src/@modules/cart/libs/hooks/useCartState";
import {
  useCancelOrder,
  useDeleteOrder,
  useGetAllOrders,
  useOrderUpdates,
  usePlaceOrder,
  useUpdateOrderStatus,
} from "@/src/@modules/order/libs/hooks";
import {
  IOrderCreate,
  IOrderInfo,
  IOrderStatusUpdate,
} from "@/src/@modules/order/libs/interface";
import { MessageInstance } from "antd/es/message/interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useOrderState = (messageApi?: MessageInstance) => {
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
        messageApi
          ?.loading(
            "Order placed successfully. Redirecting to order tracking page...",
            1,
          )
          .then(() => {
            clearCart();
            setOrders((prev) => [res?.data as any, ...prev]);
            setCart([]);
            messageApi?.success(res.message);
            router.push(`/order-track/${res?.data?.orderId}`);
          });
      },
      onError: (err) => {
        console.log(err);
        messageApi?.error(err.message);
      },
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
        console.log("res");
        if (res.success) {
          // setOrders((prev) =>
          //   prev.map((o) =>
          //     o._id === res.data?.data?._id ? { ...o, status: "cancelled" } : o,
          //   ),
          // );
          messageApi?.success("Order cancelled");
        }
      },
      onError: (err) => {
        console.log(err);
        messageApi?.error(err.message);
      },
    },
  });

  // 4. LIVE SUBSCRIPTION UPDATES
  useOrderUpdates((updated) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === updated._id ? { ...o, ...updated } : o)),
    );
    messageApi?.info(`Order ${updated._id} updated: ${updated.status}`);
  });

  //5. Delete order
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteOrder({
    config: {
      onSuccess: (res) => {
        console.log("res", res);
        if (res.success) {
          setOrders((prev) =>
            prev.filter((o) => o._id !== res.data?.data?._id),
          );
          refetch();
          messageApi?.success("Order deleted");
        }
      },
      onError: (err) => {
        console.log(err);
        messageApi?.error(err.message);
      },
    },
  });

  // 6. update order status
  const { mutate: updateStatusMutate, isPending: isUpdatingStatus } =
    useUpdateOrderStatus({
      config: {
        onSuccess: (res) => {
          console.log("res", res);
          if (res.success) {
            setOrders((prev) =>
              prev.map((o) =>
                o._id === res.data?.data?._id ? { ...o, ...res.data?.data } : o,
              ),
            );
            refetch();
            messageApi?.success("Order status updated");
          }
        },
        onError: (err) => {
          console.log(err);
          messageApi?.error(err.message);
        },
      },
    });

  const placeOrder = (checkoutInfo: IOrderCreate) => {
    if (!user?._id) {
      messageApi?.error("Please login to place an order");
      return;
    }
    placeMutate({ ...checkoutInfo });
  };
  const updateOrderStatus = (orderStatusInfo: IOrderStatusUpdate) =>
    updateStatusMutate(orderStatusInfo);

  const cancelOrder = (orderId: string) => cancelMutate(orderId);
  const deleteOrder = (orderId: string) => deleteMutate(orderId);
  return {
    orders,
    getOrderResponse,
    placeOrder,
    placeOrderAsync: placeMutateAsync,
    cancelOrder,
    deleteOrder,
    updateOrderStatus,

    refetch, // 🟢 new — may be undefined, guard on the consuming side
    isPlacing,
    isCancelling,
    isDeleting,
    isUpdatingStatus,
    isGetAllOrdersPending,
    isError,
    errorMessage,
    placeVariables,
    data,
  };
};
