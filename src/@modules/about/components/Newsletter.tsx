"use client";

import { useState } from "react";
import { useCart } from "../lib/CartContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { addToCart } = useCart();

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) return;
    // Reuse the notify mechanism via a custom event or direct DOM
    const n = document.getElementById("notify-toast");
    if (n) {
      n.textContent = "✦ You're on the list. Watch your inbox.";
      n.style.opacity = "1";
      n.style.transform = "translateY(0)";
      setTimeout(() => {
        n.style.opacity = "0";
        n.style.transform = "translateY(10px)";
      }, 3000);
    }
    setEmail("");
  };

  return (
    <section
      className="px-6 md:px-10 py-16 text-center"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <h2
        className="font-serif font-light text-[2.2rem] mb-2"
        style={{ color: "var(--text)" }}
      >
        Stay in the Shade
      </h2>
      <p
        className="text-[0.68rem] tracking-[0.08em] mb-8"
        style={{ color: "var(--muted)" }}
      >
        Early access, drops, and things worth knowing. Never noise.
      </p>

      <div className="flex max-w-[420px] mx-auto">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
          className="flex-1 text-[0.7rem] px-4 py-3 outline-none transition-colors"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRight: "none",
            color: "var(--text)",
            fontFamily: "'DM Mono', monospace",
          }}
          onFocus={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.19)")
          }
          onBlur={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
          }
        />
        <button
          onClick={handleSubscribe}
          className="text-[0.65rem] tracking-[0.12em] uppercase px-6 py-3 whitespace-nowrap transition-colors duration-200"
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
          Subscribe
        </button>
      </div>
    </section>
  );
}
