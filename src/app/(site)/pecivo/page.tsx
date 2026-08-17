import type { Metadata } from "next";
import { CatalogPageView } from "@/components/catalog/CatalogPageView";
import { PreparingOverlay } from "@/components/catalog/PreparingOverlay";
import { catalogPages } from "@/data/catalog";
import { getAllergens, getCatalogItems } from "@/lib/get-catalog";

export const dynamic = "force-dynamic";

const page = catalogPages.PECIVO;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default async function PecivoPage() {
  const [items, allergens] = await Promise.all([
    getCatalogItems(page.key),
    getAllergens(),
  ]);

  return (
    <PreparingOverlay>
      <CatalogPageView page={page} items={items} allergens={allergens} />
    </PreparingOverlay>
  );
}
