import cn from "@/src/@libs/utils/_cn";
import React from "react";
interface IProps {
    className?: string;
    pageTitle?: string;
  stats?: {
    totalOrders: number;
    totalRevenue: number;
    statusCounts: Record<
      "pending" | "confirmed" | "delivered" | "cancelled",
      number
    >;
  };
  refresh: () => void;
}
const PageHeader: React.FC<IProps> = ({ className,pageTitle, stats, refresh }) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
      )}
    >
      <div>
        <h2 className="text-2xl font-extrabold text-[#1e2a3a]">{pageTitle}</h2>
        <p className="text-gray-600 text-sm mt-0.5">
          {stats?.totalOrders} total orders · ${stats?.totalRevenue.toFixed(2)}{" "}
          revenue
        </p>
      </div>
      <button
        onClick={refresh}
        className="px-4 py-2 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors self-start sm:self-auto cursor-pointer"
      >
        ⟳ Refresh
      </button>
    </div>
  );
};

export default PageHeader;
