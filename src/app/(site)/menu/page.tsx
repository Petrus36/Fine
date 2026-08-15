import type { Metadata } from "next";
import { MenuHero } from "@/components/menu/MenuHero";
import { MenuTabs } from "@/components/menu/MenuTabs";
import { DailyMenuList } from "@/components/menu/DailyMenuList";
import { WeeklyMenuList } from "@/components/menu/WeeklyMenuList";
import { Allergens } from "@/components/menu/Allergens";
import { allergens, dailyMenus, weeklyDishes } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Denné menu varíme od utorka do piatka. Týždenné jedlá sú v ponuke celý týždeň.",
};

export default function MenuPage() {
  return (
    <>
      <MenuHero />
      <MenuTabs
        daily={<DailyMenuList menus={dailyMenus} />}
        weekly={<WeeklyMenuList dishes={weeklyDishes} />}
      />
      <Allergens items={allergens} />
    </>
  );
}
