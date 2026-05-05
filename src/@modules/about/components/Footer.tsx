const footerLinks = {
  Shop: ["New In", "Women", "Men", "Sale"],
  Info: ["About", "Sustainability", "Shipping", "Returns"],
  Connect: ["Instagram", "Pinterest", "Newsletter", "Press"],
};

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-10 pt-12 pb-8"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <p className="font-serif font-light text-[1.4rem] mb-3" style={{ color: "var(--text)" }}>
            NOCTVRE<span style={{ color: "var(--accent)" }}>.</span>
          </p>
          <p
            className="text-[0.65rem] leading-[1.8] max-w-[220px]"
            style={{ color: "var(--muted)" }}
          >
            A considered label for those who wear intention. Minimal forms. Responsible origins.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <p
              className="text-[0.6rem] tracking-[0.18em] uppercase mb-4"
              style={{ color: "var(--text)" }}
            >
              {heading}
            </p>
            <ul className="flex flex-col gap-2 list-none">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[0.65rem] tracking-[0.05em] transition-colors duration-200"
                    style={{ color: "var(--muted)", textDecoration: "none" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--text)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--muted)")
                    }
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 pt-6"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-[0.6rem] tracking-[0.08em]" style={{ color: "var(--muted)" }}>
          © 2026 NOCTVRE. Considered in every detail.
        </p>
        <div className="flex gap-2">
          {["VISA", "MC", "AMEX", "PAYPAL"].map((badge) => (
            <span
              key={badge}
              className="px-2 py-1 text-[0.55rem] tracking-[0.08em]"
              style={{
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
