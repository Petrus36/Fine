/**
 * These types mirror the Prisma models in `prisma/schema.prisma`, so swapping
 * the static sample data for database queries later does not touch the UI.
 */

export type Weekday =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type Course = "SOUP" | "MAIN_ONE" | "MAIN_TWO" | "DESSERT" | "DAILY_SPECIAL";

export interface MenuItem {
  id: string;
  course: Course;
  name: string;
  /** Allergen numbers shown in brackets after the dish name. */
  allergens: number[];
  /** Price in EUR. Soups and desserts are part of the menu, so they have none. */
  price: number | null;
}

export interface DailyMenu {
  id: string;
  weekday: Weekday;
  items: MenuItem[];
}

export interface WeeklyDish {
  id: string;
  name: string;
  description: string;
  allergens: number[];
  price: number;
  /** Chips under "Na výber" — protein or side choices. */
  options: string[];
}

export interface Allergen {
  number: number;
  label: string;
}

export const WEEKDAY_LABELS: Record<Weekday, string> = {
  MONDAY: "Pondelok",
  TUESDAY: "Utorok",
  WEDNESDAY: "Streda",
  THURSDAY: "Štvrtok",
  FRIDAY: "Piatok",
  SATURDAY: "Sobota",
  SUNDAY: "Nedeľa",
};

export const COURSE_LABELS: Record<Course, string> = {
  SOUP: "Polievka",
  MAIN_ONE: "Hlavné jedlo č. 1",
  MAIN_TWO: "Hlavné jedlo č. 2",
  DESSERT: "Dezert",
  DAILY_SPECIAL: "Ponuka dňa",
};

export const COURSE_ORDER: Course[] = [
  "SOUP",
  "MAIN_ONE",
  "MAIN_TWO",
  "DESSERT",
  "DAILY_SPECIAL",
];
