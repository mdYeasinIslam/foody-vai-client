export default function Banner() {
  return (
    <div
      className="mx-6 md:mx-10 mb-16 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8 p-8 md:p-12"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Decorative circle */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-80px",
          top: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(200,255,74,0.04)",
        }}
      />

      <div className="max-w-[50%] min-w-[240px]">
        <p
          className="text-[0.6rem] tracking-[0.2em] uppercase mb-3"
          style={{ color: "var(--accent)" }}
        >
          ✦ Limited Edition — Member Exclusive
        </p>
        <h3
          className="font-serif font-light leading-[1.1] mb-4"
          style={{ fontSize: "2.5rem", color: "var(--text)" }}
        >
          The Void
          <br />
          Collection
        </h3>
        <p className="text-[0.7rem] leading-[1.8]" style={{ color: "var(--muted)" }}>
          Twelve pieces. Uncompromising materials. A collaboration between structure and shadow.
          Only 200 units worldwide.
        </p>
        <button
          className="mt-6 text-[0.7rem] tracking-[0.12em] uppercase px-8 py-3 transition-all duration-200"
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
          Reserve Now
        </button>
      </div>

      <div className="text-right">
        <span
          className="text-[0.65rem] tracking-[0.12em] uppercase block mb-1"
          style={{ color: "var(--muted)" }}
        >
          Starting from
        </span>
        <span
          className="font-serif font-light leading-none"
          style={{ fontSize: "3.5rem", color: "var(--accent)" }}
        >
          $180
        </span>
        <p
          className="text-[0.6rem] tracking-[0.1em] mt-2"
          style={{ color: "var(--muted)" }}
        >
          MEMBERS GET 20% OFF
        </p>
      </div>
    </div>
  );
}
