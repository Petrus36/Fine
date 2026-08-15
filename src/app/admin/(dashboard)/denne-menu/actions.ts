"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { dateOfWeekday, WEEKDAY_ORDER } from "@/lib/week";
import { optionalText, parseAllergens, parsePrice, text } from "@/lib/admin-parse";
import { COURSE_ORDER, type Weekday } from "@/types/menu";
import type { ActionState } from "@/components/admin/AdminForm";

function refreshMenu(weekId?: string) {
  revalidatePath("/menu");
  revalidatePath("/admin/denne-menu");
  if (weekId) revalidatePath(`/admin/denne-menu/${weekId}`);
}

export async function createWeek(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const year = Number.parseInt(text(formData.get("year")), 10);
  const weekNumber = Number.parseInt(text(formData.get("weekNumber")), 10);

  if (!Number.isInteger(year) || year < 2020 || year > 2100) {
    return { status: "error", message: "Zadajte platný rok." };
  }
  if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 53) {
    return { status: "error", message: "Číslo týždňa musí byť medzi 1 a 53." };
  }

  const prisma = getPrisma();
  const existing = await prisma.menuWeek.findUnique({
    where: { year_weekNumber: { year, weekNumber } },
    select: { id: true },
  });

  if (existing) {
    return {
      status: "error",
      message: `Týždeň ${weekNumber}/${year} už existuje — nájdete ho v zozname nižšie.`,
    };
  }

  const week = await prisma.menuWeek.create({
    data: { year, weekNumber },
    select: { id: true },
  });

  refreshMenu(week.id);
  redirect(`/admin/denne-menu/${week.id}`);
}

export async function saveDay(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const weekId = text(formData.get("weekId"));
  const weekday = text(formData.get("weekday")) as Weekday;

  if (!weekId || !WEEKDAY_ORDER.includes(weekday)) {
    return { status: "error", message: "Neplatný deň." };
  }

  const prisma = getPrisma();
  const week = await prisma.menuWeek.findUnique({
    where: { id: weekId },
    select: { year: true, weekNumber: true },
  });

  if (!week) return { status: "error", message: "Týždeň sa nenašiel." };

  const items = COURSE_ORDER.map((course, index) => ({
    course,
    name: text(formData.get(`${course}_name`)),
    allergens: parseAllergens(formData.get(`${course}_allergens`)),
    price: parsePrice(formData.get(`${course}_price`)),
    position: index,
  })).filter((item) => item.name.length > 0);

  const date = dateOfWeekday(week.year, week.weekNumber, weekday);

  await prisma.$transaction(async (tx) => {
    const day = await tx.dailyMenu.upsert({
      where: { weekId_weekday: { weekId, weekday } },
      create: { weekId, weekday, date },
      update: { date },
      select: { id: true },
    });

    await tx.menuItem.deleteMany({ where: { dailyMenuId: day.id } });

    if (items.length > 0) {
      await tx.menuItem.createMany({
        data: items.map((item) => ({ ...item, dailyMenuId: day.id })),
      });
    }
  });

  refreshMenu(weekId);

  return {
    status: "ok",
    message: items.length > 0 ? "Uložené." : "Deň vymazaný — zostal prázdny.",
  };
}

export async function setWeekPublished(formData: FormData) {
  await requireAdmin();

  const weekId = text(formData.get("weekId"));
  const published = text(formData.get("published")) === "true";
  if (!weekId) return;

  const prisma = getPrisma();

  // Only one week is shown on the site, so publishing a week retires the others.
  await prisma.$transaction(async (tx) => {
    if (published) {
      await tx.menuWeek.updateMany({
        where: { published: true, NOT: { id: weekId } },
        data: { published: false },
      });
    }
    await tx.menuWeek.update({ where: { id: weekId }, data: { published } });
  });

  refreshMenu(weekId);
}

export async function updateWeekNote(formData: FormData) {
  await requireAdmin();

  const weekId = text(formData.get("weekId"));
  if (!weekId) return;

  await getPrisma().menuWeek.update({
    where: { id: weekId },
    data: { note: optionalText(formData.get("note")) },
  });

  refreshMenu(weekId);
}

export async function deleteWeek(formData: FormData) {
  await requireAdmin();

  const weekId = text(formData.get("weekId"));
  if (!weekId) return;

  await getPrisma().menuWeek.delete({ where: { id: weekId } });

  refreshMenu();
  redirect("/admin/denne-menu");
}
