"use client";
import BaseLoader from "@/src/@base/components/BaseLoader";
import {
  formatDateTime,
  orderId,
  STATUS_CONFIG,
} from "@/src/@libs/utils/utils";
import { message } from "antd";
import Image from "next/image";
import { FaPenAlt, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useAdminOrdersPage } from "../../../libs/hooks/useAdminOrdersPage";
import PageHeader from "../base/PageHeader";
import AllStatusStats from "./AllStatusStats";
import { ConfirmModal } from "./ConfirmModal";
import OrderDrawer from "./OrderDrawer";
import { PaymentBadge, StatusBadge } from "./StatusBadge";
import StatusModal from "./StatusModal";
import OrderTableSection from "./OrderTableSection";

export default function OrderPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    orders,
    stats,
    isLoading,
    error,
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
    handleUpdateOrderStatusFn,
    refresh,
  } = useAdminOrdersPage(messageApi);
  return (
    <>
      <div className="space-y-6 px-8 pt-5">
        {contextHolder}
        {/* header */}
        <PageHeader pageTitle="ORDERS" refresh={refresh} stats={stats} />

        {/* Summary stat chips — derived client-side from `orders` in useAdminOrdersPage */}
        <AllStatusStats
          ALL_STATUSES={ALL_STATUSES}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          stats={stats}
        />

        {/* Search + filter bar — both client-side over the fetched `orders` array */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 w-full sm:w-auto">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID, customer name or phone..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#f97316] focus:ring-2 focus:ring-[#f97316]/10 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-500 cursor-pointer"
              >
                <RxCross2 />
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus("All")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filterStatus === "All"
                  ? "bg-[#f97316] text-white shadow-[0_4px_10px_rgba(249,115,22,0.25)]"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(filterStatus === s ? "All" : s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  filterStatus === s
                    ? "bg-[#f97316] text-white shadow-[0_4px_10px_rgba(249,115,22,0.25)]"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {isLoading ? (
            <BaseLoader className={"flex justify-center mt-10"} />
          ) : error ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">⚠️</p>
              <p className="text-gray-500 font-medium">{error}</p>
              <button
                onClick={refresh}
                className="mt-3 text-[#f97316] font-semibold text-sm hover:underline"
              >
                Try again
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-gray-400 font-medium">No orders found</p>
              <p className="text-gray-300 text-sm mt-1">
                Try adjusting your search or filter
              </p>
            </div>
          ) : (
            <>
              <OrderTableSection
                orders={orders}
                setDrawer={setDrawer}
                setStatusTarget={setStatusTarget}
                setDeleteTarget={setDeleteTarget}
              />
            </>
          )}

          {orders.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-700">
              <span>Showing {orders.length} orders</span>
              {filterStatus !== "All" && (
                <button
                  onClick={() => setFilterStatus("All")}
                  className="text-[#f97316] font-semibold hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>
          )}
        </div>

        {drawer && !statusTarget && !deleteTarget && (
          <OrderDrawer
            order={drawer}
            onClose={() => setDrawer(null)}
            onStatusClick={() => setStatusTarget(drawer)}
            onDeleteClick={() => setDeleteTarget(drawer)}
          />
        )}

        {statusTarget && (
          <StatusModal
            order={statusTarget}
            onSave={handleUpdateOrderStatusFn}
            onClose={() => setStatusTarget(null)}
          />
        )}

        {deleteTarget && (
          <ConfirmModal
            order={deleteTarget}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}

        {/* <CustomToast msg={toast?.msg} type={toast?.type} /> */}

        <style>{`
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
      </div>
    </>
  );
}
