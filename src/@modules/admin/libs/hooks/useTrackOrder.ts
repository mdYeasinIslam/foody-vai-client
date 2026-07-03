import { useEffect, useState } from "react";
import { useCancelOrder, useTrackOrderHook } from "../hooks";
import { ITrackedOrder } from "../interface";
import { useSocketSubscription } from "./useSocketSubscription";

export const useTrackOrder = (orderId: string) => {
  const [order, setOrder] = useState<ITrackedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { mutate: trackMutate, isPending: loading } = useTrackOrderHook({
    config: {
      onSuccess: (res) => {
        console.log(res);
        if (res.success) setOrder(res.orderData as ITrackedOrder);
        else setError(res.message || "Order not found");
      },
    },
  });

  useEffect(() => {
    if (orderId) trackMutate(orderId);
  }, [orderId]);

  // ← reuses useSocketSubscription instead of manual socket.on
  useSocketSubscription(
    "statusUpdated",
    (data: any) => {
      if (data.orderId === orderId)
        setOrder((prev) => (prev ? { ...prev, status: data.status } : prev));
    },
    [orderId],
  );

  useSocketSubscription(
    "orderConfirmed",
    (data: any) => {
      if (data.orderId === orderId)
        setOrder((prev) =>
          prev
            ? {
                ...prev,
                status: "confirmed",
                estimatedTime: data.estimatedTime,
              }
            : prev,
        );
    },
    [orderId],
  );

  useSocketSubscription(
    "orderCancelled",
    (data: any) => {
      if (data.orderId === orderId)
        setOrder((prev) => (prev ? { ...prev, status: "cancelled" } : prev));
    },
    [orderId],
  );

  useSocketSubscription(
    "orderRejected",
    (data: any) => {
      if (data.orderId === orderId)
        setOrder((prev) => (prev ? { ...prev, status: "rejected" } : prev));
    },
    [orderId],
  );

  // ← reuses the already-written useCancelOrder
  const { mutate: cancelMutate, isPending: isCancelling } = useCancelOrder({
    config: {
      onSuccess: (res) => {
        if (!res.success) console.error(res.message);
      },
    },
  });

  const cancelOrder = (reason?: string) =>
    cancelMutate({ orderId, reason: reason || "Cancelled by customer" } as any);

  return { order, loading, error, cancelOrder, isCancelling };
};
