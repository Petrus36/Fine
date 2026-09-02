import { getPrisma } from "@/lib/prisma";
import {
  allergens as fallbackAllergens,
  dailyMenus as fallbackDailyMenus,
  weeklyDishes as fallbackWeeklyDishes,
} from "@/data/menu";
import type { Allergen, DailyMenu, MenuItem, WeeklyDish } from "@/types/menu";
import { COURSE_ORDER, type Course, type Weekday } from "@/types/menu";

function mapDailyMenus(
  days: Array<{
    id: string;
    weekday: Weekday;
    items: Array<{
      id: string;
      course: Course;
      name: string;
      allergens: number[];
      price: { toNumber(): number } | null;
    }>;
  }>,
): DailyMenu[] {
  return days
    .map((day) => ({
      id: day.id,
      weekday: day.weekday,
      items: [...day.items]
        .filter((item) => item.name.trim().length > 0)
        .sort((a, b) => COURSE_ORDER.indexOf(a.course) - COURSE_ORDER.indexOf(b.course))
        .map(
          (item): MenuItem => ({
            id: item.id,
            course: item.course,
            name: item.name,
            allergens: item.allergens,
            price: item.price ? item.price.toNumber() : null,
          }),
        ),
    }))
    .filter((day) => day.items.length > 0);
}

function mapWeeklyDishes(
  dishes: Array<{
    id: string;
    name: string;
    description: string;
    allergens: number[];
    price: { toNumber(): number };
    options: Array<{ label: string }>;
  }>,
): WeeklyDish[] {
  return dishes.map((dish) => ({
    id: dish.id,
    name: dish.name,
    description: dish.description,
    allergens: dish.allergens,
    price: dish.price.toNumber(),
    options: dish.options.map((option) => option.label),
  }));
}

export async function getMenuData(): Promise<{
  dailyMenus: DailyMenu[];
  weeklyDishes: WeeklyDish[];
  allergens: Allergen[];
}> {
  if (!process.env.DATABASE_URL) {
    return {
      dailyMenus: fallbackDailyMenus,
      weeklyDishes: fallbackWeeklyDishes,
      allergens: fallbackAllergens,
    };
  }

  try {
    const prisma = getPrisma();
    const publishedWeek = await prisma.menuWeek.findFirst({
      where: { published: true },
      orderBy: [{ year: "desc" }, { weekNumber: "desc" }],
      include: {
        days: {
          include: { items: true },
          orderBy: { weekday: "asc" },
        },
      },
    });

    const [weeklyRows, allergenRows] = await Promise.all([
      prisma.weeklyDish.findMany({
        where: { active: true },
        orderBy: { position: "asc" },
        include: { options: { orderBy: { position: "asc" } } },
      }),
      prisma.allergen.findMany({ orderBy: { number: "asc" } }),
    ]);

    const hasDbMenu =
      publishedWeek &&
      publishedWeek.days.length > 0 &&
      (weeklyRows.length > 0 || allergenRows.length > 0);

    if (!hasDbMenu) {
      return {
        dailyMenus: fallbackDailyMenus,
        weeklyDishes: fallbackWeeklyDishes,
        allergens: fallbackAllergens,
      };
    }

    return {
      dailyMenus: mapDailyMenus(publishedWeek.days),
      weeklyDishes: mapWeeklyDishes(weeklyRows),
      allergens: allergenRows.map((row) => ({ number: row.number, label: row.label })),
    };
  } catch (error) {
    console.error("Failed to load menu from database, using fallback data.", error);
    return {
      dailyMenus: fallbackDailyMenus,
      weeklyDishes: fallbackWeeklyDishes,
      allergens: fallbackAllergens,
    };
  }
}
