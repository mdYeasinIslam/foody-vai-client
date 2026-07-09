"use client";

import { useMemo, useState } from "react";
import { message } from "antd";
import { FaPlus, FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import BaseLoader from "@/src/@base/components/BaseLoader";
import PageHeader from "../base/PageHeader";

import { useProductsState } from "../../../libs/hooks/useProductsState";


import ProductTableSection from "./ProductTableSection";
import { IProduct, IProductCreateAndUpdate } from "@/src/@modules/products/libs/interfaces";
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

  // =====================================================
  // UI STATES
  // =====================================================

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [productModal, setProductModal] = useState<IProduct | "add" | null>(
    null,
  );

  const [deleteTarget, setDeleteTarget] = useState<IProduct | null>(null);

  // =====================================================
  // FILTERED PRODUCTS
  // =====================================================

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchCategory = category === "All" || product.category === category;

      if (!matchCategory) return false;

      if (!keyword) return true;

      return (
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) ||
        product.description?.toLowerCase().includes(keyword)
      );
    });
  }, [products, search, category]);

  // =====================================================
  // CATEGORY
  // =====================================================

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((item) => item.category))];
  }, [products]);

  // =====================================================
  // STATS
  // =====================================================

  const stats = useMemo(() => {
    return {
      totalProducts: products.length,
      totalCategories: categories.length - 1,
      totalVariants: products.reduce((acc, cur) => acc + cur.prices.length, 0),
    };
  }, [products]);

  // =====================================================
  // HANDLERS
  // =====================================================

  const handleSave = (payload: IProductCreateAndUpdate, id?: string) => {
    if (id) {
      updateProduct(id, payload);
    } else {
      createProduct(payload);
    }

    setProductModal(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    deleteProduct(deleteTarget._id);

    setDeleteTarget(null);
  };

  const isLoading =
    isCreating || isUpdating || isDeleting || isGetProductsPending;

  return (
    <>
      {contextHolder}

      <div className="space-y-6 px-8 pt-5">
        <PageHeader pageTitle="PRODUCTS" refresh={refetch} productStats={stats} />

        {/* SEARCH */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Product..."
              className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#f97316]"
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
            className="px-4 py-2.5 rounded-xl border border-gray-200"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <button
            onClick={() => setProductModal("add")}
            className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white rounded-xl px-5 py-2.5"
          >
            <FaPlus />
            Add Product
          </button>
        </div>

        {/* TABLE */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {isLoading ? (
            <BaseLoader className="flex justify-center py-20" />
          ) : isError ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">⚠️</p>

              <p>{errorMessage}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">📦</p>

              <p>No Products Found</p>
            </div>
          ) : (
            <ProductTableSection
              products={filteredProducts}
              setProductModal={setProductModal}
              setDeleteTarget={setDeleteTarget}
            />
          )}

          {filteredProducts.length > 0 && (
            <div className="border-t px-6 py-3 flex justify-between text-sm text-gray-500">
              <span>Showing {filteredProducts.length} Products</span>

              {category !== "All" && (
                <button
                  onClick={() => setCategory("All")}
                  className="text-[#f97316]"
                >
                  Clear Filter
                </button>
              )}
            </div>
          )}
        </div>

        {productModal && (
          <ProductModal
            product={productModal}
            categories={categories.filter((c) => c !== "All")}
            onSave={handleSave}
            onClose={() => setProductModal(null)}
          />
        )}

        {deleteTarget && (
          <ConfirmModal
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </div>
    </>
  );
}
