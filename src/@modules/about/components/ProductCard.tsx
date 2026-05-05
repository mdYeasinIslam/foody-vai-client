"use client";

import { Product, productShapes } from "../lib/data";


interface ProductCardProps {
  product: Product;
  index: number;
  onOpen: () => void;
}

export default function ProductCard({ product, index, onOpen }: ProductCardProps) {
  return (
    <div
      onClick={onOpen}
      className="relative overflow-hidden cursor-pointer transition-all duration-[250ms] group"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.145)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Tag */}
      {product.tag === "new" && (
        <span
          className="absolute top-3 left-3 text-[0.55rem] tracking-[0.1em] uppercase px-2 py-1 z-[3] text-white"
          style={{ background: "var(--accent2)" }}
        >
          New
        </span>
      )}
      {product.tag === "sale" && (
        <span
          className="absolute top-3 left-3 text-[0.55rem] tracking-[0.1em] uppercase px-2 py-1 z-[3]"
          style={{ background: "var(--warm)", color: "#0a0a0b" }}
        >
          Sale
        </span>
      )}

      {/* Image area */}
      <div
        className="h-[220px] flex items-center justify-center relative"
        style={{ background: "var(--surface2)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4))",
          }}
        />
        <div dangerouslySetInnerHTML={{ __html: productShapes[index % productShapes.length] }} />

        {/* Quick View */}
        <button
          className="absolute left-0 right-0 text-center text-[0.6rem] tracking-[0.15em] uppercase py-2.5 transition-all duration-[250ms] z-[2] w-full border-none cursor-pointer"
          style={{
            bottom: "-40px",
            background: "rgba(200,255,74,0.95)",
            color: "#0a0a0b",
            fontFamily: "'DM Mono', monospace",
            transition: "bottom 0.25s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.bottom = "0px")
          }
        >
          Quick View
        </button>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="font-serif font-light text-[1.05rem] mb-1" style={{ color: "var(--text)" }}>
          {product.name}
        </p>
        <p
          className="text-[0.6rem] tracking-[0.1em] uppercase mb-3"
          style={{ color: "var(--muted)" }}
        >
          {product.cat}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-[0.95rem] tracking-[0.05em]" style={{ color: "var(--text)" }}>
            {product.price}
          </span>
          <span className="text-[0.6rem] tracking-[0.05em]" style={{ color: "var(--warm)" }}>
            {product.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
