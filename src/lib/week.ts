import { WEEKDAY_LABELS, type Weekday } from "@/types/menu";

export const WEEKDAY_ORDER: Weekday[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

/** ISO-8601 week number and the year that week belongs to. */
export function isoWeekOf(input: Date): { year: number; week: number } {
  const date = new Date(
    Date.UTC(input.getFullYear(), input.getMonth(), input.getDate()),
  );
  const dayNumber = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return { year: date.getUTCFullYear(), week };
}

/** Monday of the given ISO week, in UTC. */
export function isoWeekStart(year: number, week: number): Date {
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  const dayOfWeek = simple.getUTCDay();
  const monday = new Date(simple);
  if (dayOfWeek <= 4) {
    monday.setUTCDate(simple.getUTCDate() - dayOfWeek + 1);
  } else {
    monday.setUTCDate(simple.getUTCDate() + 8 - dayOfWeek);
  }
  return monday;
}

export function dateOfWeekday(year: number, week: number, weekday: Weekday): Date {
  const date = isoWeekStart(year, week);
  date.setUTCDate(date.getUTCDate() + WEEKDAY_ORDER.indexOf(weekday));
  return date;
}

const dayMonth = new Intl.DateTimeFormat("sk-SK", {
  day: "numeric",
  month: "numeric",
  timeZone: "UTC",
});

/** "13. 4. – 19. 4. 2026" — helps the owner pick the right week. */
export function formatWeekRange(year: number, week: number): string {
  const start = isoWeekStart(year, week);
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  return `${dayMonth.format(start)} – ${dayMonth.format(end)} ${end.getUTCFullYear()}`;
}

export function weekdayLabel(weekday: Weekday): string {
  return WEEKDAY_LABELS[weekday];
}
