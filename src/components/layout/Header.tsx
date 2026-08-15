"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { mainNav, secondaryNav } from "@/data/site";
import { cn } from "@/lib/format";

const linkClass =
  "text-[11px] font-medium uppercase tracking-[0.16em] text-espresso/85 transition-colors hover:text-clay";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-hairline/60 bg-paper/95 backdrop-blur">
      <Container className="relative flex h-[72px] items-center justify-between">
        <nav className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(linkClass, pathname === item.href && "text-clay")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Otvoriť menu"
          aria-expanded={open}
          className="flex flex-col gap-[5px] p-2 lg:hidden"
        >
          <span className="block h-px w-6 bg-espresso" />
          <span className="block h-px w-6 bg-espresso" />
          <span className="block h-px w-6 bg-espresso" />
        </button>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo />
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {secondaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(linkClass, pathname === item.href && "text-clay")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <span className="w-10 lg:hidden" />
      </Container>

      {open ? (
        <div className="border-t border-hairline/60 bg-paper lg:hidden">
          <Container className="flex flex-col gap-4 py-6">
            {[...mainNav, ...secondaryNav].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
