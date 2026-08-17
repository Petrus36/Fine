"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { parsePrice, text } from "@/lib/admin-parse";
import type { ActionState } from "@/components/admin/AdminForm";

function refresh() {
  revalidatePath("/apartmany");
  revalidatePath("/admin/apartmany");
  revalidatePath("/admin");
}

export async function saveApartmentPrices(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const extraPersonPerDay = parsePrice(formData.get("extraPersonPerDay"));
  const cleaningFee = parsePrice(formData.get("cleaningFee"));
  const validFrom = text(formData.get("validFrom"));

  if (!extraPersonPerDay) {
    return { status: "error", message: "Zadajte cenu za ďalšiu osobu." };
  }
  if (!cleaningFee) {
    return { status: "error", message: "Zadajte cenu upratovania." };
  }
  if (!validFrom) {
    return { status: "error", message: "Zadajte, od kedy cenník platí." };
  }

  const prisma = getPrisma();
  const apartments = await prisma.apartment.findMany({ orderBy: { position: "asc" } });

  for (const apartment of apartments) {
    const price = parsePrice(formData.get(`price-${apartment.id}`));
    if (!price) {
      return {
        status: "error",
        message: `Zadajte dennú cenu pre ${apartment.name}.`,
      };
    }
    await prisma.apartment.update({
      where: { id: apartment.id },
      data: { pricePerDay: price },
    });
  }

  await prisma.apartmentSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      extraPersonPerDay,
      cleaningFee,
      validFrom,
    },
    update: { extraPersonPerDay, cleaningFee, validFrom },
  });

  refresh();
  return { status: "ok", message: "Cenník apartmánov je uložený." };
}
