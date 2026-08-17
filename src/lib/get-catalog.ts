import { getPrisma } from "@/lib/prisma";
import { catalogFallbackItems } from "@/data/catalog-items";
import { allergens as fallbackAllergens } from "@/data/menu";
import type { CatalogItem, CatalogPageKey } from "@/types/catalog";
import type { Allergen } from "@/types/menu";

function mapItems(
  rows: Array<{
    id: string;
    page: CatalogPageKey;
    section: string;
    category: string | null;
    name: string;
    description: string | null;
    allergens: number[];
    portion: string | null;
    price: { toNumber(): number };
    priceAlt: { toNumber(): number } | null;
    position: number;
  }>,
): CatalogItem[] {
  return rows.map((row) => ({
    id: row.id,
    page: row.page,
    section: row.section,
    category: row.category,
    name: row.name,
    description: row.description,
    allergens: row.allergens,
    portion: row.portion,
    price: row.price.toNumber(),
    priceAlt: row.priceAlt ? row.priceAlt.toNumber() : null,
    position: row.position,
  }));
}

export async function getAllergens(): Promise<Allergen[]> {
  if (!process.env.DATABASE_URL) return fallbackAllergens;

  try {
    const rows = await getPrisma().allergen.findMany({ orderBy: { number: "asc" } });
    return rows.length > 0
      ? rows.map((row) => ({ number: row.number, label: row.label }))
      : fallbackAllergens;
  } catch (error) {
    console.error("Failed to load allergens.", error);
    return fallbackAllergens;
  }
}

export async function getCatalogItems(page: CatalogPageKey): Promise<CatalogItem[]> {
  const fallback = catalogFallbackItems
    .filter((item) => item.page === page)
    .sort((a, b) => a.position - b.position);

  if (!process.env.DATABASE_URL) return fallback;

  try {
    const rows = await getPrisma().catalogItem.findMany({
      where: { page, active: true },
      orderBy: { position: "asc" },
    });
    return mapItems(rows);
  } catch (error) {
    console.error("Failed to load catalog items, using fallback.", error);
    return fallback;
  }
}

export function groupByCategory(items: CatalogItem[]): Array<{
  category: string | null;
  items: CatalogItem[];
}> {
  const groups: Array<{ category: string | null; items: CatalogItem[] }> = [];

  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.category === item.category) {
      last.items.push(item);
    } else {
      groups.push({ category: item.category, items: [item] });
    }
  }

  return groups;
}
