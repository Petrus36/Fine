"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import {
  parseAllergens,
  parseCheckbox,
  parseOptions,
  parsePrice,
  text,
} from "@/lib/admin-parse";
import type { ActionState } from "@/components/admin/AdminForm";

function refresh() {
  revalidatePath("/menu");
  revalidatePath("/admin/tyzdenne-menu");
}

export async function saveDish(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const id = text(formData.get("id"));
  const name = text(formData.get("name"));
  const description = text(formData.get("description"));
  const price = parsePrice(formData.get("price"));
  const allergens = parseAllergens(formData.get("allergens"));
  const options = parseOptions(formData.get("options"));
  const position = Number.parseInt(text(formData.get("position")), 10);
  const active = parseCheckbox(formData.get("active"));

  if (!name) return { status: "error", message: "Zadajte názov jedla." };
  if (!price) return { status: "error", message: "Zadajte cenu, napríklad 9,90." };

  const prisma = getPrisma();
  const data = {
    name,
    description,
    price,
    allergens,
    active,
    position: Number.isInteger(position) ? position : 0,
  };

  await prisma.$transaction(async (tx) => {
    const dish = id
      ? await tx.weeklyDish.update({ where: { id }, data, select: { id: true } })
      : await tx.weeklyDish.create({ data, select: { id: true } });

    await tx.weeklyDishOption.deleteMany({ where: { dishId: dish.id } });

    if (options.length > 0) {
      await tx.weeklyDishOption.createMany({
        data: options.map((label, index) => ({
          dishId: dish.id,
          label,
          position: index,
        })),
      });
    }
  });

  refresh();

  return { status: "ok", message: id ? "Uložené." : "Jedlo pridané." };
}

export async function deleteDish(formData: FormData) {
  await requireAdmin();

  const id = text(formData.get("id"));
  if (!id) return;

  await getPrisma().weeklyDish.delete({ where: { id } });
  refresh();
}
