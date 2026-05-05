"use client";

import { categories } from "../lib/data";


interface CategoriesProps {
  onFilter: (cat: string) => void;
}

export default function Categories({ onFilter }: CategoriesProps) {
  return (
    <section className="px-6 md:px-10 py-16">
      <div className="flex justify-between items-baseline mb-10">
        <h2 className="font-serif font-light text-[2.2rem]" style={{ color: "var(--text)" }}>
          Shop by Category
        </h2>
        <a
          className="text-[0.65rem] tracking-[0.15em] uppercase cursor-pointer transition-opacity hover:opacity-70"
          style={{ color: "var(--accent)", textDecoration: "none" }}
        >
          View All →
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.key}
            onClick={() => onFilter(cat.key)}
            className="relative overflow-hidden p-6 cursor-pointer transition-all duration-[250ms] group"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.19)";
              el.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border)";
              el.style.transform = "translateY(0)";
            }}
          >
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-[250ms] pointer-events-none"
              style={{ background: "var(--accent)" }}
            />
            <span className="text-2xl mb-3 block relative z-[1]">{cat.icon}</span>
            <p
              className="font-serif font-light text-[1.1rem] relative z-[1] mb-1"
              style={{ color: "var(--text)" }}
            >
              {cat.name}
            </p>
            <p
              className="text-[0.6rem] tracking-[0.12em] uppercase relative z-[1]"
              style={{ color: "var(--muted)" }}
            >
              {cat.count}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
