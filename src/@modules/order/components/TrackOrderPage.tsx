"use client";
import Link from "next/link";
import { useState } from "react";
import { useTrackOrder } from "../libs/hooks/useTrackOrder";
import { message, Modal } from "antd";

const ORDER_STEPS = [
  { key: "pending", label: "Order Placed", icon: "📋" },
  { key: "confirmed", label: "Confirmed", icon: "✅" },
  { key: "preparing", label: "Preparing", icon: "🔍" },
  { key: "ready", label: "Ready", icon: "✅" },
  { key: "out_for_delivery", label: "On the Way", icon: "🚗" },
  { key: "delivered", label: "Delivered", icon: "🎉" },
];

const STATUS_BANNER: Record<
  string,
  { bg: string; text: string; message: string }
> = {
  pending: {
    bg: "bg-amber-400",
    text: "text-white",
    message: "Waiting for restaurant confirmation...",
  },
  confirmed: {
    bg: "bg-blue-500",
    text: "text-white",
    message: "Your order has been confirmed! 🎉",
  },
  preparing: {
    bg: "bg-purple-500",
    text: "text-white",
    message: "Chef is preparing your order...",
  },
  ready: {
    bg: "bg-green-500",
    text: "text-white",
    message: "Order is ready for pickup!",
  },
  out_for_delivery: {
    bg: "bg-blue-600",
    text: "text-white",
    message: "Your order is on the way! 🛵",
  },
  delivered: {
    bg: "bg-green-600",
    text: "text-white",
    message: "Order delivered. Enjoy your meal! 🎉",
  },
  cancelled: {
    bg: "bg-red-500",
    text: "text-white",
    message: "This order has been cancelled.",
  },
  rejected: {
    bg: "bg-red-600",
    text: "text-white",
    message: "This order was rejected by the restaurant.",
  },
};

interface IProps {
  orderId: string;
}

const TrackOrderPage: React.FC<IProps> = ({ orderId }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const { order, loading, error, cancelOrder, isCancelling } =
    useTrackOrder(orderId);
  console.log(order);
  const currentStepIndex = ORDER_STEPS.findIndex(
    (s) => s.key === order?.status,
  );
  const banner = STATUS_BANNER[order?.status ?? "pending"];
  const canCancel = ["pending", "confirmed"].includes(order?.status ?? "");
  const isTerminal = ["delivered", "cancelled", "rejected"].includes(
    order?.status ?? "",
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    messageApi.success("Order ID copied!");
  };

  const handleCancel = () => {
    cancelOrder("Cancelled by customer");
    setCancelModalOpen(false);
    messageApi.success("Order cancelled");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-10 h-10 border-4 border-(--primary-color-800) border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading your order...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-red-500 font-medium">{error ?? "Order not found"}</p>
        <Link
          href="/"
          className="text-sm text-(--primary-color-800) hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      {contextHolder}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Tracking</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">Order ID:</span>
            <span className="text-sm font-mono bg-gray-100 px-2 py-0.5 rounded">
              {orderId}
            </span>
            <button
              onClick={handleCopy}
              className="text-gray-400 hover:text-gray-600 transition"
              title="Copy order ID"
            >
              📋
            </button>
          </div>
        </div>
        <Link
          href="/"
          className="text-sm text-(--primary-color-800) hover:underline"
        >
          ← Back to Menu
        </Link>
      </div>

      {/* Status Banner */}
      <div
        className={`${banner.bg} ${banner.text} rounded-xl px-5 py-4 font-semibold text-base`}
      >
        {banner.message}
        {order.estimatedTime && order.status === "confirmed" && (
          <span className="ml-2 text-sm font-normal opacity-90">
            (~{order.estimatedTime} mins)
          </span>
        )}
      </div>

      {/* Progress Stepper */}
      {!isTerminal ||
      (order.status !== "cancelled" && order.status !== "cancelled") ? (
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">
            Order Progress
          </h2>
          <div className="flex items-start justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-green-500 z-0 transition-all duration-700"
              style={{
                width:
                  currentStepIndex <= 0
                    ? "0%"
                    : `${(currentStepIndex / (ORDER_STEPS.length - 1)) * 100}%`,
              }}
            />
            {ORDER_STEPS.map((step, idx) => {
              const isDone = idx <= currentStepIndex;
              const isActive = idx === currentStepIndex;
              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center gap-2 z-10 flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300 ${
                      isActive
                        ? "border-green-500 bg-green-50 scale-110 shadow-md"
                        : isDone
                          ? "border-green-500 bg-green-500"
                          : "border-gray-200 bg-white"
                    }`}
                  >
                    {isDone && !isActive ? (
                      <span className="text-white text-sm">✓</span>
                    ) : (
                      <span className={isActive ? "" : "grayscale opacity-50"}>
                        {step.icon}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs text-center leading-tight ${
                      isActive
                        ? "text-green-600 font-semibold"
                        : isDone
                          ? "text-gray-600 font-medium"
                          : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Order Details */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Order Details
        </h2>
        <div className="space-y-3">
          {order.items?.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🍔</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.quantity}x {item.name}
                  </p>
                  {item.price?.weight && (
                    <p className="text-xs text-gray-400">
                      {item.price.weight} kg
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm font-semibold">
                ৳ {item.price?.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-4 space-y-2 pt-3 border-t border-gray-100">
          {[
            { label: "Subtotal", value: order.totals?.subTotal },
            { label: "Delivery Fee", value: order.totals?.deliveryCharge },
            ...(order.totals?.discount
              ? [{ label: "Discount", value: -order.totals.discount }]
              : []),
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-gray-500">{label}</span>
              <span>৳ {value}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
            <span>Total</span>
            <span className="text-(--primary-color-900)">
              ৳ {order.totals?.total}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          Delivery Information
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: "Customer Name", value: order.customerName },
            { label: "Phone", value: order.customerPhone },
            { label: "Address", value: order.customerAddress },
            { label: "Delivery Date", value: order.deliveryDate },
            { label: "Payment", value: order.paymentMethod?.toUpperCase() },
            ...(order.specialNote
              ? [{ label: "Special Notes", value: order.specialNote }]
              : []),
          ].map(({ label, value }) => (
            <div
              key={label}
              className={
                label === "Address" || label === "Special Notes"
                  ? "col-span-2"
                  : ""
              }
            >
              <p className="text-gray-400 text-xs mb-0.5">{label}</p>
              <p className="font-medium text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Button */}
      {canCancel && (
        <button
          onClick={() => setCancelModalOpen(true)}
          className="w-full py-3 rounded-xl border-2 border-red-400 text-red-500 font-semibold hover:bg-red-50 transition"
        >
          Cancel Order
        </button>
      )}

      {/* Cancel Confirm Modal */}
      <Modal
        title="Cancel this order?"
        open={cancelModalOpen}
        onOk={handleCancel}
        onCancel={() => setCancelModalOpen(false)}
        okText="Yes, cancel it"
        cancelText="Keep order"
        okButtonProps={{ danger: true, loading: isCancelling }}
      >
        <p className="text-gray-600">
          Are you sure you want to cancel order <strong>{orderId}</strong>? This
          action cannot be undone.
        </p>
      </Modal>

      {/* Connection dot */}
      {/* <div className="flex items-center justify-center gap-2 pb-2">
        <span
          className={`w-2 h-2 rounded-full ${connected ? "bg-green-400" : "bg-gray-300"}`}
        />
        <span className="text-xs text-gray-400">
          {connected ? "Live tracking active" : "Reconnecting..."}
        </span>
      </div> */}
    </div>
  );
};

export default TrackOrderPage;
