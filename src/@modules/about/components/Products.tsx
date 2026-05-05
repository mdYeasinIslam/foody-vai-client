"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import Modal from "./Modal";
import { Product, products } from "../lib/data";

interface ProductsProps {
  filterCat: string;
}

export default function Products({ filterCat }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<{ product: Product; index: number } | null>(null);

  const filtered =
    filterCat === "all"
      ? products
      : products.filter((p) => p.cat.toLowerCase() === filterCat);

  const displayList = filtered.length ? filtered : products;

  const filterLabel =
    filterCat === "all"
      ? "All Items"
      : filterCat.charAt(0).toUpperCase() + filterCat.slice(1) + " →";

  return (
    <>
      <section id="products" className="px-6 md:px-10 pb-16">
        <div className="flex justify-between items-baseline mb-10">
          <h2 className="font-serif font-light text-[2.2rem]" style={{ color: "var(--text)" }}>
            Featured Pieces
          </h2>
          <span
            className="text-[0.65rem] tracking-[0.15em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            {filterLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((p, i) => (
            <ProductCard
              key={p.name + i}
              product={p}
              index={products.indexOf(p)}
              onOpen={() => setSelectedProduct({ product: p, index: products.indexOf(p) })}
            />
          ))}
        </div>
      </section>

      {selectedProduct && (
        <Modal
          product={selectedProduct.product}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
