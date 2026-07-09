"use client";

import { useMemo, useState } from "react";
import { message } from "antd";
import { FaPlus, FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import BaseLoader from "@/src/@base/components/BaseLoader";
import PageHeader from "../base/PageHeader";

;
import {
  IProduct,
  IProductCreateAndUpdate,
} from "@/src/@modules/products/libs/interfaces";
import { useProductsState } from "../../../libs/hooks/useProductsState";
import ProductTableSection from "./ProductTableSection";
import ProductModal from "./ProductModal";
import { ConfirmModal } from "../orders/ConfirmModal";

export default function ProductsPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch,
    isCreating,
    isUpdating,
    isDeleting,
    isGetProductsPending,
    isError,
    errorMessage,
  } = useProductsState(messageApi);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [modal, setModal] = useState<IProduct | "add" | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IProduct | null>(null);

  // ============================
  // Categories
  // ============================

  const categories = useMemo(() => {
    const list = products.map((p) => p.category);

    return ["All", ...Array.from(new Set(list))];
  }, [products]);

  // ============================
  // Filtered Products
  // ============================

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory = category === "All" || item.category === category;

      const keyword = search.toLowerCase();

      const matchSearch =
        item.name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [products, search, category]);

  // ============================
  // Statistics
  // ============================

  const stats = useMemo(() => {
    return {
      totalProducts: products.length,
      totalCategories: new Set(products.map((i) => i.category)).size,
    };
  }, [products]);

  // ============================
  // Save
  // ============================

  const handleSave = (values: IProductCreateAndUpdate, id?: string) => {
    if (id) {
      updateProduct(id, values);
    } else {
      createProduct(values);
    }

    setModal(null);
  };

  // ============================
  // Delete
  // ============================

  const handleDelete = () => {
    if (!deleteTarget) return;

    deleteProduct(deleteTarget._id);

    setDeleteTarget(null);
  };

  return (
    <>
      {contextHolder}

      <div className="space-y-6 px-8 pt-5">
        <PageHeader pageTitle="PRODUCTS" refresh={refetch} productStats={stats} />

        {/* Search + Filter */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product..."
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

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-xl px-4"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <button
            onClick={() => setModal("add")}
            className="bg-[#f97316] hover:bg-[#ea6c0a] text-white rounded-xl px-5 flex items-center gap-2 font-semibold"
          >
            <FaPlus />
            Add Product
          </button>
        </div>

        {/* Table */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {isGetProductsPending ? (
            <BaseLoader className="flex justify-center mt-10" />
          ) : isError ? (
            <div className="py-20 text-center">
              <p>{errorMessage}</p>
            </div>
          ) : (
            <ProductTableSection
              products={filteredProducts}
              onEdit={(item) => setModal(item)}
              onDelete={(item) => setDeleteTarget(item)}
            />
          )}
        </div>

        {/* Modal */}

        {modal && (
          <ProductModal
            product={modal}
            categories={categories.filter((i) => i !== "All")}
            onClose={() => setModal(null)}
            onSave={handleSave}
            isLoading={isCreating || isUpdating}
          />
        )}

        {/* Delete */}

        {deleteTarget && (
          <ConfirmModal
            product={deleteTarget}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
            loading={isDeleting}
          />
        )}
      </div>
    </>
  );
}
