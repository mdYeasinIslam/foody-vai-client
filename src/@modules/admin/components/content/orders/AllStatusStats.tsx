import cn from "@/src/@libs/utils/_cn";
import { STATUS_CONFIG } from "@/src/@libs/utils/utils";
import React, { Dispatch, SetStateAction } from "react";
interface IProps {
  wrapperClassName?: string;
  innerClassName?: string;
  ALL_STATUSES: ("pending" | "cancelled" | "confirmed" | "delivered")[];
  setFilterStatus: Dispatch<
    SetStateAction<"pending" | "cancelled" | "confirmed" | "delivered" | "All">
  >;
  filterStatus: "pending" | "cancelled" | "confirmed" | "delivered" | "All";
  stats: {
    totalOrders: number;
    totalRevenue: number;
    statusCounts: Record<
      "pending" | "cancelled" | "confirmed" | "delivered",
      number
    >;
  };
}
const AllStatusStats: React.FC<IProps> = ({
  wrapperClassName,
  ALL_STATUSES,
  setFilterStatus,
  filterStatus,
  stats,
}) => {
  return (
    <div
      className={cn(wrapperClassName, "grid grid-cols-2 sm:grid-cols-4 gap-3")}
    >
      {/* Summary stat chips — derived client-side from `orders` in useAdminOrdersPage */}
      {ALL_STATUSES?.map((status) => {
        const cfg = STATUS_CONFIG[status];
        return (
          <button
            key={status}
            onClick={() =>
              setFilterStatus(filterStatus === status ? "All" : status)
            }
            className={cn(
              `flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 `,
              filterStatus === status
                ? "border-[#f97316] bg-[#f97316]/5 shadow-[0_4px_12px_rgba(249,115,22,0.15)]"
                : "border-gray-100 bg-white hover:border-gray-200 shadow-sm"
            )}
          >
            <span className={`w-3 h-3 rounded-full shrink-0 ${cfg.dot}`} />
            <div>
              <p className="text-xl font-extrabold text-[#1e2a3a] leading-none">
                {stats.statusCounts[status] ?? 0}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{cfg.label}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default AllStatusStats;
