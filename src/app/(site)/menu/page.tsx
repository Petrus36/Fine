import type { Metadata } from "next";
import { MenuHero } from "@/components/menu/MenuHero";
import { MenuTabs } from "@/components/menu/MenuTabs";
import { DailyMenuList } from "@/components/menu/DailyMenuList";
import { WeeklyMenuList } from "@/components/menu/WeeklyMenuList";
import { Allergens } from "@/components/menu/Allergens";
import { CatalogCta } from "@/components/catalog/CatalogCta";
import { getMenuData } from "@/lib/get-menu";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Denné menu varíme od utorka do piatka. Týždenné jedlá sú v ponuke celý týždeň.",
};

export default async function MenuPage() {
  const { dailyMenus, weeklyDishes, allergens } = await getMenuData();

  return (
    <>
      <MenuHero />
      <MenuTabs
        daily={<DailyMenuList menus={dailyMenus} />}
        weekly={<WeeklyMenuList dishes={weeklyDishes} />}
      />
      <CatalogCta />
      <Allergens items={allergens} />
    </>
  );
}
