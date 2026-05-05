"use client";

import { useState } from "react";
import { Product } from "../lib/data";
import { useCart } from "../lib/CartContext";

interface ModalProps {
  product: Product;
  onClose: () => void;
}

const sizes = ["XS", "S", "M", "L", "XL"];

export default function Modal({ product, onClose }: ModalProps) {
  const [selectedSize, setSelectedSize] = useState("XS");
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product.name, product.price);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-[500px] p-10 animate-modalIn"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[1.2rem] leading-none transition-colors"
          style={{
            background: "none",
            border: "none",
            color: "var(--muted)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
        >
          ✕
        </button>

        <p
          className="text-[0.6rem] tracking-[0.12em] uppercase mb-1"
          style={{ color: "var(--muted)" }}
        >
          {product.cat} — Selected
        </p>
        <h3
          className="font-serif font-light text-[1.6rem] mb-1"
          style={{ color: "var(--text)" }}
        >
          {product.name}
        </h3>
        <p
          className="text-[1.3rem] tracking-[0.05em] mb-6"
          style={{ color: "var(--accent)" }}
        >
          {product.price}
        </p>
        <p
          className="text-[0.68rem] leading-[1.8] mb-8"
          style={{ color: "var(--muted)" }}
        >
          {product.desc}
        </p>

        <p
          className="text-[0.6rem] tracking-[0.15em] uppercase mb-3"
          style={{ color: "var(--muted)" }}
        >
          Select Size
        </p>
        <div className="flex gap-2 mb-6 flex-wrap">
          {sizes.map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className="px-3 py-1.5 text-[0.65rem] transition-all duration-150"
              style={{
                background: "none",
                border: selectedSize === sz ? "1px solid var(--accent)" : "1px solid var(--border)",
                color: selectedSize === sz ? "var(--accent)" : "var(--muted)",
                cursor: "pointer",
                fontFamily: "'DM Mono', monospace",
              }}
              onMouseEnter={(e) => {
                if (selectedSize !== sz) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.color = "var(--accent)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedSize !== sz) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--muted)";
                }
              }}
            >
              {sz}
            </button>
          ))}
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-3.5 text-[0.7rem] tracking-[0.15em] uppercase transition-all duration-200"
          style={{
            background: "var(--accent)",
            color: "#0a0a0b",
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Mono', monospace",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#d4ff60")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--accent)")
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
