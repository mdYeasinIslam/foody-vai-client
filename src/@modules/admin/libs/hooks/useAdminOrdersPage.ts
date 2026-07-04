
import { useMemo, useState } from "react";
import { IOrderInfo } from "@/src/@modules/order/libs/interface";
import { MessageInstance } from "antd/es/message/interface";
import { useOrderState } from "@/src/@modules/order/libs/hooks/useOrderState";

// Kept as IOrderInfo["status"] (not a redeclared union) so this can never
// drift out of sync with the real interface.
export type OrderStatus = IOrderInfo["status"];

const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "delivered",
  "cancelled",
];

interface ToastState {
  msg: string;
  type: "success" | "error";
}

/**
 * useOrderState only gives us: orders, placeOrder, cancelOrder, refetch(?),
 * and loading/error flags. Everything the admin table/drawer needs on top
 * of that — search, status filter, which modal is open, derived stats,
 * and a lightweight toast — lives here instead of being invented as if
 * the data hook already provided it.
 */
export function useAdminOrdersPage(messageApi?: MessageInstance) {
  const {
    orders,
    isGetAllOrdersPending,
    isError,
    errorMessage,
    cancelOrder,
    isCancelling,
    refetch,
  } = useOrderState(messageApi);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "All">("All");
  const [drawer, setDrawer] = useState<IOrderInfo | null>(null);
  const [statusTarget, setStatusTarget] = useState<IOrderInfo | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IOrderInfo | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesStatus = filterStatus === "All" || o.status === filterStatus;
      if (!matchesStatus) return false;
      if (!q) return true;
      return (
        (o.orderId ?? o._id).toLowerCase().includes(q) ||
        o.customerName?.toLowerCase().includes(q) ||
        o.customerPhone?.toLowerCase().includes(q)
      );
    });
  }, [orders, search, filterStatus]);

  const stats = useMemo(() => {
    const statusCounts = ALL_STATUSES.reduce(
      (acc, s) => {
        acc[s] = 0;
        return acc;
      },
      {} as Record<OrderStatus, number>,
    );
    let totalRevenue = 0;
    for (const o of orders) {
      statusCounts[o.status] = (statusCounts[o.status] ?? 0) + 1;
      totalRevenue += o.totalAmount || 0;
    }
    return { totalOrders: orders.length, totalRevenue, statusCounts };
  }, [orders]);

  // 🟡 Only "cancelled" is backed by a real mutation (useCancelOrder).
  // There's no confirm/deliver endpoint on useOrderState yet — wire one
  // in and swap the branch below once it exists.
  const handleStatusSave = (status: OrderStatus) => {
    if (!statusTarget) return;
    if (status === "cancelled") {
      cancelOrder(statusTarget._id);
      setToast({ msg: "Order cancelled", type: "success" });
    } else {
      setToast({
        msg: `No endpoint yet to move an order to "${status}" — only cancel is wired up.`,
        type: "error",
      });
    }
    setStatusTarget(null);
  };

  // 🟡 There is no delete-order mutation in useOrderState. This soft-cancels
  // as a stand-in so the button isn't dead — replace with a real
  // useDeleteOrder hook when the backend supports it.
  const handleDelete = () => {
    if (!deleteTarget) return;
    cancelOrder(deleteTarget._id);
    setToast({
      msg: "No delete endpoint yet — order was cancelled instead.",
      type: "error",
    });
    setDeleteTarget(null);
  };

  const refresh = () => {
    if (refetch) {
      refetch();
    } else {
      setToast({
        msg: "Refresh isn't wired to a real refetch yet.",
        type: "error",
      });
    }
  };

  return {
    orders: filteredOrders,
    stats,
    isLoading: isGetAllOrdersPending || isCancelling,
    error: isError ? errorMessage || "Failed to load orders." : null,
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    ALL_STATUSES,
    drawer,
    setDrawer,
    statusTarget,
    setStatusTarget,
    deleteTarget,
    setDeleteTarget,
    toast,
    handleStatusSave,
    handleDelete,
    refresh,
  };
}
