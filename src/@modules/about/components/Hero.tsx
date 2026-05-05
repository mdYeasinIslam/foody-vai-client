"use client";

import { useCart } from "../lib/CartContext";


export default function Hero() {
  const { addToCart } = useCart();

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 min-h-[88vh] overflow-hidden"
    >

      {/* Hero Left */}
      <div
        className="flex flex-col justify-center px-6 md:px-10 py-16 relative z-[2]"
        style={{ gridColumn: "1" }}
      >
        {/* Tag */}
        <p
          className="text-[0.65rem] tracking-[0.25em] uppercase mb-6 flex items-center gap-2"
          style={{ color: "var(--accent)" }}
        >
          <span
            className="inline-block w-6"
            style={{ height: "1px", background: "var(--accent)" }}
          />
          New Collection — SS26
        </p>

        {/* Title */}
        <h1
          className="font-serif font-light leading-[1.05] mb-6"
          style={{
            fontSize: "clamp(3rem, 5vw, 5.5rem)",
            color: "var(--text)",
          }}
        >
          Dressed in
          <br />
          <em style={{ fontStyle: "italic", color: "var(--warm)" }}>Darkness,</em>
          <br />
          Lit by Design.
        </h1>

        {/* Desc */}
        <p
          className="text-[0.72rem] leading-[1.9] tracking-[0.03em] mb-10 max-w-[380px]"
          style={{ color: "var(--muted)" }}
        >
          Minimal forms. Considered materials. Crafted for those who move between worlds —
          where aesthetic meets intent.
        </p>

        {/* Actions */}
        <div className="flex gap-4 items-center flex-wrap">
          <button
            onClick={scrollToProducts}
            className="text-[0.7rem] tracking-[0.12em] uppercase px-8 py-3 transition-all duration-200 hover:-translate-y-0.5"
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
            Shop the Edit
          </button>
          <button
            className="text-[0.7rem] tracking-[0.12em] uppercase px-6 py-3 transition-all duration-200"
            style={{
              background: "none",
              color: "var(--muted)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--text)";
              el.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border)";
              el.style.color = "var(--muted)";
            }}
          >
            Lookbook →
          </button>
        </div>

        {/* Stats */}
        <div
          className="flex gap-10 mt-12 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {[
            { num: "4.8", label: "Avg. Rating" },
            { num: "12k", label: "Orders Placed" },
            { num: "98%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label}>
              <span
                className="font-serif font-light text-[2rem] block"
                style={{ color: "var(--text)" }}
              >
                {s.num}
              </span>
              <span
                className="text-[0.6rem] tracking-[0.15em] uppercase"
                style={{ color: "var(--muted)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Right */}
      <div className="relative overflow-hidden hidden md:block" style={{ background: "var(--surface)" }}>
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(200,255,74,0.06) 0%, transparent 65%)",
          }}
        />

        <div className="relative w-full h-full flex items-center justify-center p-12">
          {/* Floating tags */}
          <span
            className="absolute text-[0.6rem] tracking-[0.1em] px-3 py-2 whitespace-nowrap animate-float1"
            style={{
              top: "15%",
              left: "5%",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            ✦ Organic Cotton
          </span>

          {/* Product Card */}
          <div
            className="relative p-8 transition-transform duration-300 hover:-translate-y-1.5 w-[260px]"
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border)",
            }}
          >
            <span
              className="absolute -top-2.5 right-5 text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1"
              style={{ background: "var(--accent)", color: "#0a0a0b" }}
            >
              New Drop
            </span>

            {/* Product Image */}
            <div
              className="w-full mb-6 flex items-center justify-center relative overflow-hidden"
              style={{
                height: "180px",
                background: "linear-gradient(135deg, #1a1a22 0%, #222230 100%)",
              }}
            >
              <div
                className="absolute w-20 h-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ background: "rgba(200,255,74,0.08)" }}
              />
              <svg
                className="relative z-[1]"
                width="64"
                height="80"
                viewBox="0 0 64 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 26 L8 72 L56 72 L52 26 Z"
                  stroke="#c8ff4a"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M22 26 C22 18 26 10 32 10 C38 10 42 18 42 26"
                  stroke="#c8ff4a"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="24" cy="38" r="2" fill="#c8ff4a" opacity="0.6" />
                <circle cx="40" cy="38" r="2" fill="#c8ff4a" opacity="0.6" />
              </svg>
            </div>

            <p className="font-serif font-light text-[1.2rem] mb-1" style={{ color: "var(--text)" }}>
              Onyx Tote
            </p>
            <p
              className="text-[0.6rem] tracking-[0.12em] uppercase mb-4"
              style={{ color: "var(--muted)" }}
            >
              Recycled Leather
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[1.1rem] tracking-[0.05em]" style={{ color: "var(--accent)" }}>
                $248
              </span>
              <button
                onClick={() => addToCart("Onyx Tote", "$248")}
                className="w-8 h-8 flex items-center justify-center text-lg transition-all duration-200"
                style={{
                  background: "none",
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--accent)";
                  el.style.color = "#0a0a0b";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "none";
                  el.style.color = "var(--accent)";
                }}
              >
                +
              </button>
            </div>
          </div>

          <span
            className="absolute text-[0.6rem] tracking-[0.1em] px-3 py-2 whitespace-nowrap animate-float2"
            style={{
              bottom: "20%",
              right: "5%",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            ✦ Free Shipping $150+
          </span>
        </div>
      </div>
    </section>
  );
}
