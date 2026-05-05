"use client";

import { useCart } from "../lib/CartContext";


export default function Nav() {
  const { cartCount } = useCart();

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="flex justify-between items-center px-4 md:px-8 py-5 border-b sticky top-0 z-[100]"
      style={{
        borderColor: "var(--border)",
        background: "rgba(10,10,11,0.85)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Logo */}
      <div
        className="font-serif text-2xl font-light tracking-widest"
        style={{ color: "var(--text)" }}
      >
        NOCTVRE<span style={{ color: "var(--accent)" }}>.</span>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex gap-8 list-none">
        {["New In", "Women", "Men", "Edit", "About"].map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-[0.7rem] tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: "var(--muted)", textDecoration: "none" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--muted)")
              }
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Cart */}
      <div className="flex items-center gap-4">
        <button
          onClick={scrollToProducts}
          className="relative text-[0.65rem] tracking-[0.12em] uppercase px-4 py-2 font-mono transition-transform duration-150 hover:scale-[1.03]"
          style={{
            background: "var(--accent)",
            color: "#0a0a0b",
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          Cart
          {cartCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[0.55rem] font-medium text-white"
              style={{ background: "var(--accent2)" }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
