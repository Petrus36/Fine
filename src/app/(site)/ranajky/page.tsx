import type { Metadata } from "next";
import { CatalogPageView } from "@/components/catalog/CatalogPageView";
import { catalogPages } from "@/data/catalog";
import { getAllergens, getCatalogItems } from "@/lib/get-catalog";

export const dynamic = "force-dynamic";

const page = catalogPages.RANAJKY;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default async function RanajkyPage() {
  const [items, allergens] = await Promise.all([
    getCatalogItems(page.key),
    getAllergens(),
  ]);

  return <CatalogPageView page={page} items={items} allergens={allergens} />;
}
