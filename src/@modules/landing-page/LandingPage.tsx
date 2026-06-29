"use client";
import { useState, useEffect } from "react";

const NAV_LINKS = ["Products", "About", "Benefits", "Contact"];

const CATEGORIES = [
  {
    icon: "🌿",
    name: "Hair Care",
    desc: "Nourishing shampoos & conditioners crafted with natural extracts.",
    tag: "Shampoo · Conditioner",
  },
  {
    icon: "🧼",
    name: "Body Soap",
    desc: "Gentle, skin-friendly bars and liquid soaps for everyday use.",
    tag: "Bar Soap · Liquid Soap",
  },
  {
    icon: "💧",
    name: "Essential Oils",
    desc: "Pure carrier and essential oils — skin, hair and wellness.",
    tag: "Coconut · Argan · Olive",
  },
  {
    icon: "🛡️",
    name: "Antiseptics",
    desc: "Hospital-grade antiseptics and sanitisers for home and clinic.",
    tag: "Sanitiser · Antiseptic Wash",
  },
];

const PRODUCTS = [
  {
    name: "Argan Glow Shampoo",
    price: "৳ 320",
    badge: "Best Seller",
    emoji: "🧴",
  },
  { name: "Neem & Tulsi Soap", price: "৳ 95", badge: "Natural", emoji: "🧼" },
  {
    name: "Cold-Pressed Coconut Oil",
    price: "৳ 480",
    badge: "Pure",
    emoji: "🥥",
  },
  {
    name: "ProShield Antiseptic",
    price: "৳ 220",
    badge: "Clinically Tested",
    emoji: "🛡️",
  },
  { name: "Olive Moisture Soap", price: "৳ 130", badge: "New", emoji: "🫒" },
  { name: "Rosemary Hair Oil", price: "৳ 395", badge: "Trending", emoji: "🌹" },
];

const TESTIMONIALS = [
  {
    name: "Fatema R.",
    city: "Dhaka",
    text: "The coconut oil is incredibly pure — my hair has never felt healthier. Fast delivery too!",
    stars: 5,
  },
  {
    name: "Sabbir H.",
    city: "Chittagong",
    text: "Switched to their antiseptic line for our pharmacy. Great quality, bulk pricing is fair.",
    stars: 5,
  },
  {
    name: "Nusrat J.",
    city: "Sylhet",
    text: "Love the neem soap — smells amazing and my skin cleared up within weeks.",
    stars: 5,
  },
];

export default function LandingPage() {
  const [cartCount, setCartCount] = useState(0);
  const [addedIndex, setAddedIndex] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Lock body scroll while menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const addToCart = (i: number) => {
    setCartCount((c) => c + 1);
    setAddedIndex(i);
    setTimeout(() => setAddedIndex(null), 1200);
  };

  const subscribe = () => {
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="font-sans antialiased" style={{ color: "#014725" }}>
      {/* ── Global CSS ─────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3 { font-family: 'Playfair Display', serif; }
        a { text-decoration: none; }
        img, svg { display: block; max-width: 100%; }

        /* ── Button ─────────────────────────────────────────────── */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background-color: #0e9b3b;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: clamp(0.78rem, 2.2vw, 0.9rem);
          letter-spacing: 0.02em;
          padding: clamp(10px, 2vw, 13px) clamp(18px, 4vw, 28px);
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .btn-primary:hover  { background-color: #008129; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(14,155,59,0.25); }
        .btn-primary:active { transform: translateY(0); }

        .btn-primary.outline {
          background-color: transparent;
          color: #0e9b3b;
          border: 2px solid #0e9b3b;
        }
        .btn-primary.outline:hover { background-color: #E5F2E9; box-shadow: none; }

        .btn-primary.white { background-color: #ffffff; color: #0e9b3b; }
        .btn-primary.white:hover { background-color: #E9F5EE; box-shadow: 0 4px 16px rgba(255,255,255,0.2); }

        /* ── Mobile drawer overlay ──────────────────────────────── */
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(1,71,37,0.45);
          z-index: 80;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .drawer-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        /* ── Drawer panel ───────────────────────────────────────── */
        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: min(80vw, 300px);
          background: #ffffff;
          z-index: 90;
          transform: translateX(100%);
          transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          padding: 24px 24px 40px;
          gap: 0;
          box-shadow: -4px 0 24px rgba(1,71,37,0.12);
        }
        .drawer.open { transform: translateX(0); }

        /* ── Product card hover ─────────────────────────────────── */
        .product-card:hover .card-img { transform: scale(1.08); }

        /* ── Fade in ────────────────────────────────────────────── */
        .fade-in { animation: fadeUp 0.35s ease both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Fluid type helpers ─────────────────────────────────── */
        .text-hero   { font-size: clamp(2rem,   7vw, 3.75rem); line-height: 1.15; }
        .text-h2     { font-size: clamp(1.5rem, 4.5vw, 2.5rem); }
        .text-h3     { font-size: clamp(1rem,   2.5vw, 1.2rem); }
        .text-body   { font-size: clamp(0.85rem, 2vw, 1rem); }
        .text-small  { font-size: clamp(0.72rem, 1.8vw, 0.875rem); }
        .text-label  { font-size: clamp(0.65rem, 1.6vw, 0.75rem); }

        /* ── Section spacing ────────────────────────────────────── */
        .section-pad { padding: clamp(48px, 8vw, 96px) clamp(16px, 5vw, 80px); }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between shadow-sm"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #E5F2E9",
          padding: "0 clamp(16px,5vw,48px)",
          height: "clamp(56px,8vw,68px)",
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span
            className="flex items-center justify-center rounded-full text-white font-bold"
            style={{
              backgroundColor: "#0e9b3b",
              width: "clamp(28px,5vw,34px)",
              height: "clamp(28px,5vw,34px)",
              fontSize: "clamp(0.7rem,2vw,0.875rem)",
              flexShrink: 0,
            }}
          >
            P
          </span>
          <span
            style={{
              fontFamily: "Playfair Display, serif",
              color: "#014725",
              fontWeight: 700,
              fontSize: "clamp(0.95rem,3vw,1.2rem)",
            }}
          >
            PureEssence
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                style={{
                  color: "#62595D",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0e9b3b")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#62595D")}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: cart + CTA + hamburger */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <button
            aria-label="Cart"
            className="relative flex items-center justify-center rounded-full"
            style={{
              background: "#E5F2E9",
              width: "clamp(34px,6vw,40px)",
              height: "clamp(34px,6vw,40px)",
              fontSize: "clamp(0.9rem,2.5vw,1.1rem)",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            🛒
            {cartCount > 0 && (
              <span
                className="absolute flex items-center justify-center rounded-full text-white fade-in"
                style={{
                  backgroundColor: "#0e9b3b",
                  width: 18,
                  height: 18,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  top: -2,
                  right: -2,
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop Shop Now */}
          <a href="#products" className="btn-primary hidden md:inline-flex">
            Shop Now
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center rounded-lg"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              width: 36,
              height: 36,
              fontSize: "1.25rem",
              color: "#014725",
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════
          MOBILE DRAWER (slide from right)
      ═══════════════════════════════════════════════ */}
      {/* Backdrop */}
      <div
        className={`drawer-overlay${menuOpen ? " open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`drawer${menuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between mb-8">
          <span
            style={{
              fontFamily: "Playfair Display, serif",
              color: "#014725",
              fontWeight: 700,
              fontSize: "1.05rem",
            }}
          >
            PureEssence
          </span>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            style={{
              background: "#E5F2E9",
              border: "none",
              borderRadius: "50%",
              width: 34,
              height: 34,
              cursor: "pointer",
              fontSize: "1rem",
              color: "#014725",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col" style={{ gap: 4 }}>
          {NAV_LINKS.map((l, idx) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={closeMenu}
              style={{
                color: "#014725",
                fontWeight: 600,
                fontSize: "1rem",
                padding: "12px 10px",
                borderRadius: 8,
                transition: "background 0.15s",
                animationDelay: `${idx * 40}ms`,
              }}
              className={menuOpen ? "fade-in" : ""}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#E5F2E9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {l}
            </a>
          ))}
        </nav>

        <div style={{ height: 1, background: "#E5F2E9", margin: "20px 0" }} />

        <a
          href="#products"
          className="btn-primary"
          onClick={closeMenu}
          style={{ width: "100%", justifyContent: "center" }}
        >
          Shop Now →
        </a>

        <div style={{ marginTop: "auto", paddingTop: 32 }}>
          <p style={{ color: "#878585", fontSize: "0.72rem" }}>
            Free delivery above ৳ 1,000
          </p>
          <p style={{ color: "#878585", fontSize: "0.72rem", marginTop: 4 }}>
            Cash on delivery available
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          HERO — split panel
      ═══════════════════════════════════════════════ */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100svh - 64px)",
        }}
        className="md:flex-row"
      >
        {/* Left — copy */}
        <div
          className="flex flex-col justify-center md:w-1/2"
          style={{
            backgroundColor: "#ffffff",
            padding: "clamp(40px,7vw,80px) clamp(16px,6vw,64px)",
          }}
        >
          <span
            className="text-label font-semibold tracking-widest uppercase w-fit rounded-full"
            style={{
              backgroundColor: "#E5F2E9",
              color: "#0e9b3b",
              padding: "5px 14px",
              marginBottom: "clamp(16px,3vw,28px)",
              display: "inline-block",
            }}
          >
            100% Natural · Bangladesh-Made
          </span>

          <h1
            className="text-hero"
            style={{ color: "#014725", marginBottom: "clamp(14px,3vw,24px)" }}
          >
            Pure care,
            <br />
            <span style={{ color: "#0e9b3b" }}>delivered</span>
            <br />
            to your door.
          </h1>

          <p
            className="text-body"
            style={{
              color: "#62595D",
              marginBottom: "clamp(24px,4vw,40px)",
              maxWidth: 440,
              lineHeight: 1.7,
            }}
          >
            From cold-pressed oils to clinically tested antiseptics — everything
            your home needs, sourced clean and priced honestly.
          </p>

          <div
            className="flex flex-wrap"
            style={{ gap: "clamp(8px,2vw,12px)" }}
          >
            <a href="#products" className="btn-primary">
              Browse Products ↓
            </a>
            <a href="#about" className="btn-primary outline">
              Our Story
            </a>
          </div>

          {/* Trust bar */}
          <div
            className="flex flex-wrap"
            style={{
              gap: "clamp(16px,4vw,32px)",
              marginTop: "clamp(28px,5vw,48px)",
            }}
          >
            {[
              { stat: "2,400+", label: "Happy customers" },
              { stat: "50+", label: "Products" },
              { stat: "100%", label: "Natural sourcing" },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "#014725",
                    fontWeight: 700,
                    fontSize: "clamp(1.2rem,3.5vw,1.75rem)",
                  }}
                >
                  {stat}
                </div>
                <div
                  className="text-label"
                  style={{ color: "#878585", marginTop: 2 }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — dark panel */}
        <div
          className="md:w-1/2 flex flex-col justify-center items-center"
          style={{
            backgroundColor: "#014725",
            padding: "clamp(36px,6vw,64px) clamp(16px,5vw,48px)",
            gap: "clamp(16px,3vw,24px)",
          }}
        >
          <p
            className="text-label font-semibold tracking-widest uppercase"
            style={{ color: "#0e9b3b" }}
          >
            What we sell
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "clamp(10px,2vw,16px)",
              width: "100%",
              maxWidth: 380,
            }}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="rounded-2xl flex flex-col cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "clamp(14px,3vw,22px)",
                  gap: "clamp(6px,1.5vw,10px)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-3px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <span style={{ fontSize: "clamp(1.5rem,4vw,2rem)" }}>
                  {cat.icon}
                </span>
                <div
                  className="text-small font-semibold"
                  style={{ color: "#E5F2E9" }}
                >
                  {cat.name}
                </div>
                <div className="text-label" style={{ color: "#878585" }}>
                  {cat.tag}
                </div>
              </div>
            ))}
          </div>
          <p
            className="text-label text-center"
            style={{ color: "rgba(229,242,233,0.4)" }}
          >
            Free delivery above ৳ 1,000 · Cash on delivery available
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CATEGORIES
      ═══════════════════════════════════════════════ */}
      <section
        id="products"
        className="section-pad"
        style={{ backgroundColor: "#F7F7F7" }}
      >
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between"
            style={{ marginBottom: "clamp(28px,5vw,48px)", gap: 16 }}
          >
            <div>
              <span
                className="text-label font-semibold tracking-widest uppercase"
                style={{ color: "#0e9b3b" }}
              >
                Categories
              </span>
              <h2 className="text-h2" style={{ marginTop: 8 }}>
                Everything for your household
              </h2>
            </div>
            <a
              href="#all-products"
              className="btn-primary outline"
              style={{ width: "fit-content" }}
            >
              View all →
            </a>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
              gap: "clamp(12px,2.5vw,20px)",
            }}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="rounded-2xl flex flex-col"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #E5F2E9",
                  padding: "clamp(16px,3vw,24px)",
                  gap: "clamp(8px,1.5vw,12px)",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(14,155,59,0.1)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <span style={{ fontSize: "clamp(1.75rem,4vw,2.25rem)" }}>
                  {cat.icon}
                </span>
                <h3
                  className="text-h3 font-semibold"
                  style={{ color: "#014725" }}
                >
                  {cat.name}
                </h3>
                <p
                  className="text-small"
                  style={{ color: "#62595D", lineHeight: 1.6 }}
                >
                  {cat.desc}
                </p>
                <span
                  className="text-label font-medium"
                  style={{ color: "#878585", marginTop: "auto" }}
                >
                  {cat.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED PRODUCTS
      ═══════════════════════════════════════════════ */}
      <section
        id="all-products"
        className="section-pad"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div
            className="text-center"
            style={{ marginBottom: "clamp(28px,5vw,48px)" }}
          >
            <span
              className="text-label font-semibold tracking-widest uppercase"
              style={{ color: "#0e9b3b" }}
            >
              Featured
            </span>
            <h2 className="text-h2" style={{ marginTop: 8 }}>
              Customer favourites
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: "clamp(12px,2.5vw,24px)",
            }}
          >
            {PRODUCTS.map((p, i) => (
              <div
                key={p.name}
                className="product-card rounded-2xl overflow-hidden flex flex-col"
                style={{ border: "1px solid #E5F2E9" }}
              >
                {/* Image area */}
                <div
                  className="flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: "#E9F5EE",
                    height: "clamp(120px,18vw,176px)",
                  }}
                >
                  <span
                    className="card-img"
                    style={{
                      fontSize: "clamp(2.5rem,7vw,3.75rem)",
                      transition: "transform 0.3s",
                      display: "block",
                    }}
                  >
                    {p.emoji}
                  </span>
                </div>

                <div
                  className="flex flex-col flex-1"
                  style={{
                    padding: "clamp(12px,2.5vw,20px)",
                    gap: "clamp(8px,1.5vw,12px)",
                  }}
                >
                  <span
                    className="text-label font-semibold rounded-full w-fit"
                    style={{
                      backgroundColor: "#E5F2E9",
                      color: "#008129",
                      padding: "3px 10px",
                    }}
                  >
                    {p.badge}
                  </span>

                  <h3
                    className="text-small font-semibold"
                    style={{ color: "#014725" }}
                  >
                    {p.name}
                  </h3>

                  <div
                    className="flex items-center justify-between"
                    style={{ marginTop: "auto" }}
                  >
                    <span
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontWeight: 700,
                        fontSize: "clamp(1rem,2.5vw,1.15rem)",
                        color: "#014725",
                      }}
                    >
                      {p.price}
                    </span>

                    <button
                      className="btn-primary"
                      onClick={() => addToCart(i)}
                      style={{
                        padding: "8px clamp(12px,2.5vw,18px)",
                        fontSize: "clamp(0.72rem,1.8vw,0.82rem)",
                        backgroundColor:
                          addedIndex === i ? "#008129" : "#0e9b3b",
                      }}
                    >
                      {addedIndex === i ? "✓ Added" : "Add to cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ABOUT / BENEFITS
      ═══════════════════════════════════════════════ */}
      <section
        id="about"
        className="section-pad"
        style={{ backgroundColor: "#014725" }}
      >
        <div
          className="flex flex-col md:flex-row items-center"
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            gap: "clamp(32px,6vw,64px)",
          }}
        >
          {/* Text */}
          <div className="md:w-1/2">
            <span
              className="text-label font-semibold tracking-widest uppercase"
              style={{ color: "#0e9b3b" }}
            >
              About PureEssence
            </span>
            <h2
              className="text-h2"
              style={{
                color: "#E5F2E9",
                margin: "clamp(10px,2vw,16px) 0 clamp(14px,3vw,24px)",
              }}
            >
              We believe clean living
              <br />
              shouldn&apos;t cost the earth.
            </h2>
            <p
              className="text-body"
              style={{
                color: "rgba(229,242,233,0.75)",
                lineHeight: 1.7,
                marginBottom: "clamp(20px,4vw,32px)",
              }}
            >
              Founded in Dhaka, PureEssence sources directly from local
              producers to bring you authentic, additive-free personal care
              products. Every batch is lab-tested. Every ingredient is declared.
              No hidden chemistry.
            </p>
            <a href="#contact" className="btn-primary white">
              Get in touch →
            </a>
          </div>

          {/* Benefits */}
          <div
            id="benefits"
            className="md:w-1/2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "clamp(10px,2vw,16px)",
            }}
          >
            {[
              {
                icon: "🔬",
                title: "Lab Verified",
                body: "Independent testing on every production batch.",
              },
              {
                icon: "🌱",
                title: "Naturally Sourced",
                body: "Local and organic raw material partners only.",
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                body: "Dhaka: same day. Outside: 1–3 working days.",
              },
              {
                icon: "💬",
                title: "Real Support",
                body: "Talk to a real person, not a chatbot.",
              },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "clamp(14px,2.5vw,20px)",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(1.25rem,3vw,1.5rem)",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  {icon}
                </span>
                <div
                  className="text-small font-semibold"
                  style={{ color: "#E5F2E9", marginBottom: 4 }}
                >
                  {title}
                </div>
                <div
                  className="text-label"
                  style={{ color: "rgba(229,242,233,0.6)", lineHeight: 1.5 }}
                >
                  {body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <section className="section-pad" style={{ backgroundColor: "#E9F5EE" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div
            className="text-center"
            style={{ marginBottom: "clamp(28px,5vw,48px)" }}
          >
            <span
              className="text-label font-semibold tracking-widest uppercase"
              style={{ color: "#0e9b3b" }}
            >
              Reviews
            </span>
            <h2 className="text-h2" style={{ color: "#014725", marginTop: 8 }}>
              What our customers say
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
              gap: "clamp(12px,2.5vw,24px)",
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl flex flex-col"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #E5F2E9",
                  padding: "clamp(16px,3vw,24px)",
                  gap: "clamp(10px,2vw,16px)",
                }}
              >
                <div style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span
                      key={i}
                      style={{ color: "#0e9b3b", fontSize: "0.85rem" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p
                  className="text-small"
                  style={{
                    color: "#62595D",
                    lineHeight: 1.65,
                    fontStyle: "italic",
                  }}
                >
                  &apos;{t.text}&apos;
                </p>
                <div style={{ marginTop: "auto" }}>
                  <div
                    className="text-small font-semibold"
                    style={{ color: "#014725" }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-label"
                    style={{ color: "#878585", marginTop: 2 }}
                  >
                    {t.city}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          NEWSLETTER / CONTACT
      ═══════════════════════════════════════════════ */}
      <section
        id="contact"
        className="section-pad text-center"
        style={{ backgroundColor: "#F7F7F7" }}
      >
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <span
            className="text-label font-semibold tracking-widest uppercase"
            style={{ color: "#0e9b3b" }}
          >
            Stay in the loop
          </span>
          <h2
            className="text-h2"
            style={{
              color: "#014725",
              margin: "clamp(8px,2vw,12px) 0 clamp(8px,2vw,14px)",
            }}
          >
            Get deals before anyone else.
          </h2>
          <p
            className="text-small"
            style={{
              color: "#62595D",
              marginBottom: "clamp(20px,4vw,32px)",
              lineHeight: 1.6,
            }}
          >
            No spam. Just restocks, seasonal offers, and new arrivals — straight
            to your inbox.
          </p>

          {subscribed ? (
            <div
              className="rounded-xl font-semibold fade-in"
              style={{
                backgroundColor: "#E5F2E9",
                color: "#008129",
                padding: "clamp(12px,2.5vw,16px) 24px",
                fontSize: "clamp(0.8rem,2vw,0.9rem)",
              }}
            >
              ✓ You&apos;re subscribed! Welcome to PureEssence.
            </div>
          ) : (
            <div
              className="flex flex-col sm:flex-row"
              style={{
                gap: "clamp(8px,2vw,12px)",
                maxWidth: 420,
                margin: "0 auto",
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && subscribe()}
                className="flex-1 rounded-lg outline-none"
                style={{
                  border: "1px solid #E5F2E9",
                  backgroundColor: "#ffffff",
                  color: "#014725",
                  padding: "clamp(10px,2vw,13px) 16px",
                  fontSize: "clamp(0.8rem,2vw,0.875rem)",
                  minWidth: 0,
                }}
              />
              <button className="btn-primary" onClick={subscribe}>
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════ */}
      <footer
        className="flex flex-col md:flex-row items-center justify-between"
        style={{
          backgroundColor: "#014725",
          padding: "clamp(28px,5vw,40px) clamp(16px,5vw,64px)",
          gap: "clamp(12px,2vw,16px)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center rounded-full text-white font-bold"
            style={{
              backgroundColor: "#0e9b3b",
              width: 28,
              height: 28,
              fontSize: "0.75rem",
              flexShrink: 0,
            }}
          >
            P
          </span>
          <span
            style={{
              fontFamily: "Playfair Display, serif",
              color: "#E5F2E9",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            PureEssence
          </span>
        </div>

        <p
          className="text-center text-label"
          style={{ color: "rgba(229,242,233,0.4)" }}
        >
          © {new Date().getFullYear()} PureEssence. All rights reserved. ·
          Dhaka, Bangladesh
        </p>

        <div className="flex" style={{ gap: "clamp(12px,3vw,20px)" }}>
          {["Facebook", "WhatsApp", "Instagram"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-label"
              style={{
                color: "rgba(229,242,233,0.5)",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0e9b3b")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(229,242,233,0.5)")
              }
            >
              {s}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
