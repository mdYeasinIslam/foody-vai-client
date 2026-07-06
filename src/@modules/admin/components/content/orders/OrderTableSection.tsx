import { formatDateTime, orderId } from "@/src/@libs/utils/utils";
import { IOrderInfo } from "@/src/@modules/order/libs/interface";
import Image from "next/image";
import React, { SetStateAction } from "react";
import { FaPenAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PaymentBadge, StatusBadge } from "./StatusBadge";
import cn from "@/src/@libs/utils/_cn";
interface IProps {
  className?: string;
  orders: IOrderInfo[];
  setDrawer: (value: SetStateAction<IOrderInfo | null>) => void;
  setStatusTarget: (value: SetStateAction<IOrderInfo | null>) => void;
  setDeleteTarget: (value: SetStateAction<IOrderInfo | null>) => void;
}
const OrderTableSection: React.FC<IProps> = ({
  className,
  orders,
  setDrawer,
  setStatusTarget,
  setDeleteTarget,
}) => {
  return (
    <div className={cn(className, "overflow-x-auto")}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <th className="px-6 py-4">Order ID</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Items</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Payment</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500">
          {orders?.map((order) => {
            const { date, time } = formatDateTime(order.createdAt);
            const itemImages = order?.items?.slice(0, 3);
            const itemCount = order.items.length;
            const itemLabel = itemCount > 1 ? "s" : "";
            return (
              <tr
                key={order._id}
                onClick={() => setDrawer(order)}
                className="hover:bg-(--secondary-color-600) transition-colors cursor-pointer "
              >
                <td className="px-6 py-4 font-mono text-xs font-bold text-[#f97316]">
                  #{orderId(order)}
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-[#1e2a3a]">
                    {order.customerName || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {order.customerPhone || "—"}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2">
                    {itemImages?.map((item, i) =>
                      item?.img ? (
                        <Image
                          key={`${order._id}-${i}`}
                          src={item.img}
                          alt={item.name}
                          title={item.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-lg object-cover border-2 border-white"
                        />
                      ) : null,
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {itemCount} item{itemLabel}
                  </p>
                </td>
                <td className="px-6 py-4 font-bold text-[#1e2a3a]">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <PaymentBadge status={order.paymentStatus} />
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-900 text-xs">{date}</p>
                  <p className="text-gray-700 text-xs mt-0.5">{time}</p>
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setStatusTarget(order);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-500 transition-colors cursor-pointer"
                      title="Update status"
                    >
                      <FaPenAlt />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget(order);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer"
                      title="Delete order"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTableSection;
