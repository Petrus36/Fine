"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import {
  optionalText,
  parseAllergens,
  parseCheckbox,
  parsePrice,
  text,
} from "@/lib/admin-parse";
import { catalogPages, isCatalogPageKey } from "@/data/catalog";
import type { ActionState } from "@/components/admin/AdminForm";
import type { CatalogPageKey } from "@/types/catalog";

function refresh(page: CatalogPageKey) {
  const def = catalogPages[page];
  revalidatePath(`/${def.slug}`);
  revalidatePath("/admin/ponuka");
  revalidatePath(`/admin/ponuka/${def.slug}`);
}

export async function saveCatalogItem(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const pageRaw = text(formData.get("page"));
  const section = text(formData.get("section"));
  if (!isCatalogPageKey(pageRaw) || !section) {
    return { status: "error", message: "Neplatná sekcia." };
  }

  const def = catalogPages[pageRaw];
  if (!def.sections.some((entry) => entry.key === section)) {
    return { status: "error", message: "Túto sekciu nie je možné meniť." };
  }

  const name = text(formData.get("name"));
  const price = parsePrice(formData.get("price"));
  if (!name) return { status: "error", message: "Zadajte názov." };
  if (!price) return { status: "error", message: "Zadajte cenu, napríklad 4,20." };

  const position = Number.parseInt(text(formData.get("position")), 10);
  const data = {
    page: pageRaw,
    section,
    name,
    description: optionalText(formData.get("description")),
    category: optionalText(formData.get("category")),
    allergens: parseAllergens(formData.get("allergens")),
    portion: optionalText(formData.get("portion")),
    price,
    priceAlt: parsePrice(formData.get("priceAlt")),
    position: Number.isInteger(position) ? position : 0,
    active: parseCheckbox(formData.get("active")),
  };

  const id = text(formData.get("id"));
  const prisma = getPrisma();
  if (id) {
    await prisma.catalogItem.update({ where: { id }, data });
  } else {
    await prisma.catalogItem.create({ data });
  }

  refresh(pageRaw);
  return { status: "ok", message: id ? "Uložené." : "Položka pridaná." };
}

export async function deleteCatalogItem(formData: FormData) {
  await requireAdmin();

  const id = text(formData.get("id"));
  const pageRaw = text(formData.get("page"));
  if (!id || !isCatalogPageKey(pageRaw)) return;

  await getPrisma().catalogItem.delete({ where: { id } });
  refresh(pageRaw);
}
