"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { saveUploadedImage, UploadError } from "@/lib/upload";
import { optionalText, parseCheckbox, text } from "@/lib/admin-parse";
import type { ActionState } from "@/components/admin/AdminForm";

function refresh() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/upozornenie");
}

/** The form sends plain dates; the end date counts as the whole day. */
function parseDate(value: FormDataEntryValue | null, edge: "start" | "end"): Date | null {
  const raw = text(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const date = new Date(`${raw}T${edge === "start" ? "00:00:00" : "23:59:59"}.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function saveAlert(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const title = text(formData.get("title"));
  const body = text(formData.get("body"));

  if (!title) return { status: "error", message: "Zadajte nadpis upozornenia." };
  if (!body) return { status: "error", message: "Zadajte text upozornenia." };

  const startsAt = parseDate(formData.get("startsAt"), "start");
  const endsAt = parseDate(formData.get("endsAt"), "end");

  if (startsAt && endsAt && endsAt <= startsAt) {
    return { status: "error", message: "Koniec zobrazovania musí byť po začiatku." };
  }

  const id = text(formData.get("id"));
  const removeImage = parseCheckbox(formData.get("removeImage"));
  const upload = formData.get("image");

  let imageUrl: string | null | undefined;
  if (upload instanceof File && upload.size > 0) {
    try {
      imageUrl = await saveUploadedImage(upload, "alerts");
    } catch (error) {
      if (error instanceof UploadError) {
        return { status: "error", message: error.message };
      }
      console.error("Alert image upload failed.", error);
      return { status: "error", message: "Obrázok sa nepodarilo nahrať." };
    }
  } else if (removeImage) {
    imageUrl = null;
  }

  const data = {
    title,
    body,
    buttonLabel: optionalText(formData.get("buttonLabel")),
    buttonUrl: optionalText(formData.get("buttonUrl")),
    active: parseCheckbox(formData.get("active")),
    startsAt,
    endsAt,
    ...(imageUrl === undefined ? {} : { imageUrl }),
  };

  const prisma = getPrisma();
  if (id) {
    await prisma.alertWindow.update({ where: { id }, data });
  } else {
    await prisma.alertWindow.create({ data: { ...data, imageUrl: imageUrl ?? null } });
  }

  refresh();

  return {
    status: "ok",
    message: data.active ? "Uložené a zobrazuje sa na webe." : "Uložené ako vypnuté.",
  };
}

export async function deleteAlert(formData: FormData) {
  await requireAdmin();

  const id = text(formData.get("id"));
  if (!id) return;

  await getPrisma().alertWindow.delete({ where: { id } });
  refresh();
}
