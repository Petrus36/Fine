import { Container } from "@/components/ui/Container";
import { highlights } from "@/data/site";

type IconName = "clock" | "cloche" | "bed" | "phone";

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "clock":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "cloche":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 15h16" />
          <path d="M6 15a6 6 0 0 1 12 0" />
          <path d="M12 7V5" />
        </svg>
      );
    case "bed":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 17v-6h13a4 4 0 0 1 4 4v2" />
          <path d="M3 17h18M3 11V7" />
          <circle cx="7.5" cy="9.5" r="1.5" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common} aria-hidden>
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
          <path d="M11 18.5h2" />
        </svg>
      );
  }
}

export function InfoBar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <div
      className={
        isDark
          ? "border-t border-white/10 bg-espresso/35 backdrop-blur-[2px]"
          : "border-b border-hairline/70 bg-paper"
      }
    >
      <Container>
        <div className="grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <span className={isDark ? "shrink-0 text-paper/80" : "shrink-0 text-clay"}>
                <Icon name={item.icon} />
              </span>
              <div>
                <p
                  className={`font-display text-[11px] font-semibold tracking-[0.16em] uppercase ${
                    isDark ? "text-paper" : "text-espresso"
                  }`}
                >
                  {item.label}
                </p>
                <p
                  className={`mt-1.5 text-[13px] leading-snug ${isDark ? "text-paper/80" : "text-stone"}`}
                >
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
