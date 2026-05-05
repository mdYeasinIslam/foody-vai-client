"use client";

import { useEffect, useRef } from "react";
import { useCart } from "../lib/CartContext";

export default function NotifyToast() {
  const { notify } = useCart();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (notify) {
      ref.current.style.opacity = "1";
      ref.current.style.transform = "translateY(0)";
    } else {
      ref.current.style.opacity = "0";
      ref.current.style.transform = "translateY(10px)";
    }
  }, [notify]);

  return (
    <>
      <div
        ref={ref}
        className="fixed bottom-8 right-8 z-[300] px-6 py-4 text-[0.7rem] pointer-events-none transition-all duration-300"
        style={{
          background: "var(--surface2)",
          border: "1px solid var(--border)",
          color: "var(--accent)",
          opacity: 0,
          transform: "translateY(10px)",
        }}
      >
        {notify}
      </div>
      {/* For newsletter subscription fallback */}
      <div
        id="notify-toast"
        className="fixed bottom-8 right-8 z-[300] px-6 py-4 text-[0.7rem] pointer-events-none transition-all duration-300"
        style={{
          background: "var(--surface2)",
          border: "1px solid var(--border)",
          color: "var(--accent)",
          opacity: 0,
          transform: "translateY(10px)",
        }}
      />
    </>
  );
}
