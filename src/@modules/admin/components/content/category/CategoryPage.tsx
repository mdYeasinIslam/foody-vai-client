"use client";

import { useMemo, useState } from "react";
import { message } from "antd";
import { FaPlus, FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import BaseLoader from "@/src/@base/components/BaseLoader";
import PageHeader from "../base/PageHeader";
import { useCategoryState } from "../../../libs/hooks/useCategoryState";
import {
  ICategory,
  ICategoryCreateAndUpdate,
} from "@/src/@modules/categories/libs/interfaces";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";
import { ConfirmModal } from "../orders/ConfirmModal";

export default function CategoryPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const {
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch,
    isCreating,
    isUpdating,
    isDeleting,
    isGetCategoriesPending,
    isError,
    errorMessage,
  } = useCategoryState(messageApi);

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ICategory | "add" | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ICategory | null>(null);

  // ============================
  // Filtered Categories
  // ============================

  const filteredCategories = useMemo(() => {
    return categories.filter((item) => {
      const keyword = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(keyword) ||
        item?.description?.toLowerCase().includes(keyword)
      );
    });
  }, [categories, search]);

  // ============================
  // Statistics
  // ============================

  const stats = useMemo(() => {
    return {
      totalCategories: categories.length,
    };
  }, [categories]);

  // ============================
  // Save
  // ============================

  const handleSave = (values: ICategoryCreateAndUpdate, id?: string) => {
    if (id) {
      updateCategory(id, values);
    } else {
      createCategory(values);
    }
    setModal(null);
  };

  // Delete ============================

  const handleDelete = () => {
    if (!deleteTarget?._id) return;
    deleteCategory(deleteTarget._id);
    setDeleteTarget(null);
  };

  return (
    <>
      {contextHolder}

      <div className="space-y-6 px-8 pt-5">
        <PageHeader
          pageTitle="CATEGORIES"
          refresh={refetch}
          // categoryStats={stats}
        />

        {/* Search + Filter */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category..."
              className="w-full border rounded-xl py-2.5 pl-10 pr-10 outline-none focus:border-[#f97316]"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <RxCross2 />
              </button>
            )}
          </div>

          <button
            onClick={() => setModal("add")}
            className="bg-[#f97316] hover:bg-[#ea6c0a] text-white rounded-xl px-5 flex items-center gap-2 font-semibold cursor-pointer"
          >
            <FaPlus />
            Add Category
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {isGetCategoriesPending ? (
            <BaseLoader className="flex justify-center mt-10" />
          ) : isError ? (
            <div className="py-20 text-center">
              <p>{errorMessage}</p>
            </div>
          ) : (
            <CategoryTable
              categories={filteredCategories}
              onEdit={(item) => setModal(item)}
              onDelete={(item) => setDeleteTarget(item)}
            />
          )}
        </div>

        {/* Modal */}

        {modal && (
          <CategoryModal
            open={!!modal}
            category={modal}
            onClose={() => setModal(null)}
            onSave={handleSave}
            isLoading={isCreating || isUpdating}
          />
        )}

        {/* Delete */}

        {deleteTarget && (
          <ConfirmModal
            onCancel={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </>
  );
}
