"use client";

import { openCookieSettings } from "@/lib/cookie-consent";
import { cn } from "@/lib/format";

export function CookieSettingsButton({
  children = "Nastavenia cookies",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={cn(
        "font-body text-[10px] leading-relaxed font-normal text-paper/45 transition-colors hover:text-paper",
        className,
      )}
    >
      {children}
    </button>
  );
}
