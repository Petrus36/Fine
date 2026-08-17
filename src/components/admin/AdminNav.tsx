"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/format";

const links = [
  { href: "/admin", label: "Prehľad" },
  { href: "/admin/denne-menu", label: "Denné menu" },
  { href: "/admin/tyzdenne-menu", label: "Týždenné menu" },
  { href: "/admin/ponuka", label: "Ponuka" },
  { href: "/admin/upozornenie", label: "Upozornenie" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto">
      {links.map((link) => {
        const active =
          link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "whitespace-nowrap rounded-[3px] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
              active
                ? "bg-clay text-paper"
                : "text-stone hover:bg-cream-dark hover:text-espresso",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
