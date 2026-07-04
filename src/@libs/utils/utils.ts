import {
  IOrderInfo,
  OrderStatus,
  PaymentStatus,
} from "@/src/@modules/order/libs/interface";

export const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "delivered",
  "cancelled",
];

export const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; dot: string; badge: string }
> = {
  pending: {
    label: "Pending",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-600",
  },
  confirmed: {
    label: "Confirmed",
    dot: "bg-blue-400",
    badge: "bg-blue-50 text-blue-600",
  },
  delivered: {
    label: "Delivered",
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-600",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-red-400",
    badge: "bg-red-50 text-red-600",
  },
};

export const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; badge: string }
> = {
  pending: { label: "Payment Pending", badge: "bg-amber-50 text-amber-600" },
  completed: { label: "Paid", badge: "bg-emerald-50 text-emerald-600" },
  failed: { label: "Payment Failed", badge: "bg-red-50 text-red-600" },
};

export function orderId(order: IOrderInfo): string {
  return order.orderId || order._id;
}

export function formatDateTime(input?: string | Date | null): {
  date: string;
  time: string;
} {
  if (!input) return { date: "—", time: "—" };
  const d = new Date(input);
  if (isNaN(d.getTime())) return { date: "—", time: "—" };
  return {
    date: d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export function itemsTotal(order: IOrderInfo): number {
  return order.items.reduce(
    (sum, item) => sum + item.price.price * (item.quantity || 1),
    0,
  );
}
