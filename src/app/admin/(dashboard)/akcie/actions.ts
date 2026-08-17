"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { saveUploadedImage, UploadError } from "@/lib/upload";
import { parseCheckbox, text } from "@/lib/admin-parse";
import type { ActionState } from "@/components/admin/AdminForm";

function refresh() {
  revalidatePath("/akcie");
  revalidatePath("/admin/akcie");
  revalidatePath("/admin");
}

export async function saveEvent(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const id = text(formData.get("id"));
  const title = text(formData.get("title"));
  const body = text(formData.get("body"));
  const position = Number.parseInt(text(formData.get("position")), 10);
  const active = parseCheckbox(formData.get("active"));
  const removeImage = parseCheckbox(formData.get("removeImage"));
  const upload = formData.get("image");

  if (!title) return { status: "error", message: "Zadajte nadpis akcie." };
  if (!body) return { status: "error", message: "Zadajte text akcie." };

  let imageUrl: string | null | undefined;
  if (upload instanceof File && upload.size > 0) {
    try {
      imageUrl = await saveUploadedImage(upload, "events");
    } catch (error) {
      if (error instanceof UploadError) {
        return { status: "error", message: error.message };
      }
      console.error("Event image upload failed.", error);
      return { status: "error", message: "Obrázok sa nepodarilo nahrať." };
    }
  } else if (removeImage) {
    imageUrl = null;
  }

  const data = {
    title,
    body,
    active,
    position: Number.isInteger(position) ? position : 0,
    ...(imageUrl === undefined ? {} : { imageUrl }),
  };

  const prisma = getPrisma();
  if (id) {
    await prisma.event.update({ where: { id }, data });
  } else {
    await prisma.event.create({ data: { ...data, imageUrl: imageUrl ?? null } });
  }

  refresh();
  return { status: "ok", message: id ? "Akcia je uložená." : "Akcia je pridaná." };
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();

  const id = text(formData.get("id"));
  if (!id) return;

  await getPrisma().event.delete({ where: { id } });
  refresh();
}
