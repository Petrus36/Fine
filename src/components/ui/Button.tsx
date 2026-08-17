import Link from "next/link";
import { cn } from "@/lib/format";

type Variant = "primary" | "outline" | "ghost";
type Shape = "square" | "pill";

const base =
  "inline-flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-clay text-paper hover:bg-rust",
  outline:
    "border border-hairline bg-paper/90 text-ink hover:border-clay hover:text-clay",
  ghost: "text-ink hover:text-clay",
};

const shapes: Record<Shape, string> = {
  square: "rounded-[3px]",
  pill: "rounded-full",
};

export function Button({
  href,
  children,
  variant = "primary",
  shape = "square",
  className,
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  shape?: Shape;
  className?: string;
  size?: "sm" | "md";
}) {
  const classNames = cn(
    base,
    variants[variant],
    shapes[shape],
    size === "sm" ? "px-5 py-2.5" : "px-7 py-3.5",
    className,
  );
  const external = href.startsWith("http://") || href.startsWith("https://");

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-clay",
        className,
      )}
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}
