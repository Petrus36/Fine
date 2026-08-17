import type { CatalogItem } from "@/types/catalog";
import { groupByCategory } from "@/lib/get-catalog";
import { CatalogItemRow } from "./CatalogItemRow";

export function CatalogItemList({
  items,
  compact = false,
}: {
  items: CatalogItem[];
  compact?: boolean;
}) {
  if (items.length === 0) {
    return <p className="text-[12px] text-stone">Ponuka sa pripravuje.</p>;
  }

  const groups = groupByCategory(items);

  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <div key={group.category ?? "default"} className="space-y-3">
          {group.category ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-clay">
              {group.category}
            </p>
          ) : null}
          {group.items.map((item) => (
            <CatalogItemRow key={item.id} item={item} compact={compact} />
          ))}
        </div>
      ))}
    </div>
  );
}
