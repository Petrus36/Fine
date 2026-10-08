import type { CatalogItem, CatalogSectionDef } from "@/types/catalog";

/** Section keys whose menu rows belong in this block (e.g. chlieb + slane on one page). */
export function catalogSectionKeys(section: CatalogSectionDef): string[] {
  return section.itemSections?.length ? section.itemSections : [section.key];
}

export function itemsForCatalogSection(
  section: CatalogSectionDef,
  items: CatalogItem[],
): CatalogItem[] {
  const keys = new Set(catalogSectionKeys(section));
  return items
    .filter((item) => keys.has(item.section))
    .sort((a, b) => a.position - b.position);
}
