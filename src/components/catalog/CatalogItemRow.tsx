import type { CatalogItem } from "@/types/catalog";
import { formatPrices } from "@/lib/format";
import { cn } from "@/lib/format";

export function CatalogItemRow({
  item,
  compact = false,
}: {
  item: CatalogItem;
  compact?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0">
        <p
          className={cn(
            "text-espresso",
            compact ? "text-[13px] font-medium" : "text-[13.5px] font-semibold",
          )}
        >
          {item.name}
          {item.allergens.length > 0 ? (
            <span className="ml-1.5 text-[10px] font-medium text-clay">
              {item.allergens.join(",")}
            </span>
          ) : null}
        </p>
        {item.description ? (
          <p className="mt-0.5 text-[11px] leading-relaxed text-stone">{item.description}</p>
        ) : null}
        {item.portion ? (
          <p className="mt-0.5 text-[11px] text-stone/90">{item.portion}</p>
        ) : null}
      </div>
      <p className="shrink-0 text-[13px] font-semibold text-espresso">
        {formatPrices(item.price, item.priceAlt)}
      </p>
    </div>
  );
}
