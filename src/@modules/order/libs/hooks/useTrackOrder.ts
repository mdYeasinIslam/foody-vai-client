import { useSocket } from "@/src/@libs/socket/hooks/useSocket";
import { useEffect, useState } from "react";

export interface ITrackedOrder {
  _id: string;
  orderId: string;
  status: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: any[];
  totals: {
    subTotal: number;
    deliveryCharge: number;
    discount: number;
    total: number;
  };
  paymentMethod: string;
  deliveryDate: string;
  specialNote?: string;
  estimatedTime?: number;
  statusHistory: { status: string; timestamp: string; note: string }[];
  createdAt: string;
}

export const useTrackOrder = (orderId: string) => {
  const { socket, connected } = useSocket();
  const [order, setOrder] = useState<ITrackedOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Fetch order & join room
  useEffect(() => {
    if (!socket || !connected || !orderId) return;

    setLoading(true);
    socket.emit("trackOder", { orderId }, (res: any) => {
      setLoading(false);
      if (res.success) {
        setOrder(res.order);
      } else {
        setError(res.message || "Order not found");
      }
    });
  }, [socket, connected, orderId]);
  console.log(order);

  // Listen for real-time events
  useEffect(() => {
    if (!socket) return;
    socket.on("statusUpdated", (data: any) => {
      if (data.orderId === orderId) {
        setOrder((prev) => (prev ? { ...prev, status: data.status } : prev));
      }
    });
    socket.on("orderConfirmed", (data: any) => {
      if (data.orderId === orderId) {
        setOrder((prev) =>
          prev
            ? {
                ...prev,
                status: "confirmed",
                estimatedTime: data.estimatedTime,
              }
            : prev,
        );
      }
    });
    socket.on("orderCancelled", (data: any) => {
      if (data.orderId === orderId) {
        setOrder((prev) => (prev ? { ...prev, status: "cancelled" } : prev));
      }
    });
    socket.on("orderRejected", (data: any) => {
      if (data.orderId === orderId) {
        setOrder((prev) => (prev ? { ...prev, status: "rejected" } : prev));
      }
    });

    return () => {
      socket.off("statusUpdated");
      socket.off("orderConfirmed");
      socket.off("orderCancelled");
      socket.off("orderRejected");
    };
  }, [socket, orderId]);

  const cancelOrder = (reason?: string) => {
    if (!socket || !connected) return;
    setIsCancelling(true);
    socket.emit(
      "cancelOrder",
      { orderId, reason: reason || "Cancelled by customer" },
      (res: any) => {
        setIsCancelling(false);
        if (!res.success) {
          // caller can handle the error message
          console.error(res.message);
        }
      },
    );
  };

  return { order, loading, error, connected, cancelOrder, isCancelling };
};
