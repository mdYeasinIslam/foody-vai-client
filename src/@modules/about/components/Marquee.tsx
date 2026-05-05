import { marqueeItems } from "../lib/data";

export default function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div
      className="overflow-hidden py-3"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div className="flex gap-8 whitespace-nowrap animate-scroll" style={{ width: "max-content" }}>
        {[...doubled, ...doubled].map((item, i) => (
          <span
            key={i}
            className="text-[0.65rem] tracking-[0.2em] uppercase flex items-center gap-3"
            style={{ color: "var(--muted)" }}
          >
            <span style={{ color: "var(--accent)", fontSize: "0.5rem" }}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
