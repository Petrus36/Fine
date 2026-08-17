import type { CatalogItem } from "@/types/catalog";
import { cn } from "@/lib/format";
import { CatalogItemList } from "./CatalogItemList";

export function MenuCard({
  title,
  intro,
  items,
  className,
  underline = true,
}: {
  title: string;
  intro?: string;
  items: CatalogItem[];
  className?: string;
  underline?: boolean;
}) {
  return (
    <div className={cn("rounded-[10px] bg-paper px-7 py-8 shadow-[0_18px_40px_-28px_rgba(39,27,16,0.45)] sm:px-9 sm:py-9", className)}>
      <h2 className="font-display text-[26px] leading-none font-normal text-espresso">{title}</h2>
      {underline ? <div className="mt-2.5 h-px w-14 bg-espresso/35" /> : null}
      {intro ? <p className="mt-3 text-[12px] text-stone">{intro}</p> : null}
      <div className="mt-6">
        <CatalogItemList items={items} />
      </div>
    </div>
  );
}
