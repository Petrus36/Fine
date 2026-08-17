import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { catalogBySlug } from "@/data/catalog";
import { priceToInput } from "@/lib/admin-parse";
import { deleteCatalogItem, saveCatalogItem } from "../actions";
import { CatalogItemCard, type CatalogItemValues } from "@/components/admin/CatalogItemCard";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { dangerButtonClass } from "@/components/admin/styles";

export const dynamic = "force-dynamic";

function toValues(
  page: string,
  section: string,
  row?: {
    id: string;
    name: string;
    description: string | null;
    category: string | null;
    allergens: number[];
    portion: string | null;
    price: { toNumber(): number };
    priceAlt: { toNumber(): number } | null;
    position: number;
    active: boolean;
  },
): CatalogItemValues {
  return {
    id: row?.id ?? "",
    page,
    section,
    name: row?.name ?? "",
    description: row?.description ?? "",
    category: row?.category ?? "",
    allergens: row?.allergens.join(",") ?? "",
    portion: row?.portion ?? "",
    price: row ? priceToInput(row.price) : "",
    priceAlt: row ? priceToInput(row.priceAlt) : "",
    position: row?.position ?? 0,
    active: row?.active ?? true,
  };
}

export default async function PonukaEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAdmin();
  const { slug } = await params;
  const page = catalogBySlug(slug);
  if (!page) notFound();

  const rows = await getPrisma().catalogItem.findMany({
    where: { page: page.key },
    orderBy: { position: "asc" },
  });

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/admin/ponuka"
          className="text-[11px] uppercase tracking-[0.14em] text-stone hover:text-clay"
        >
          ← Späť na ponuku
        </Link>
        <h1 className="mt-3 font-display text-[26px] text-espresso">{page.title}</h1>
        <p className="mt-1 max-w-[62ch] text-[13px] leading-relaxed text-stone">
          Sekcie a fotky sú dané dizajnom. Tu pridávate a upravujete len položky.
          Zmeny sa hneď prejavia na{" "}
          <Link href={`/${page.slug}`} className="text-clay hover:underline" target="_blank">
            /{page.slug}
          </Link>
          .
        </p>
      </div>

      {page.sections.map((section) => {
        const sectionRows = rows.filter((row) => row.section === section.key);
        return (
          <section key={section.key} className="space-y-4">
            <div>
              <h2 className="font-display text-[18px] text-espresso">{section.title}</h2>
              <p className="text-[12px] text-stone">Sekcia ostáva — menia sa len riadky.</p>
            </div>

            {sectionRows.map((row) => (
              <CatalogItemCard
                key={row.id}
                item={toValues(page.key, section.key, row)}
                action={saveCatalogItem}
                submitLabel="Uložiť zmeny"
                footer={
                  <>
                    <input type="hidden" name="page" value={page.key} />
                    <ConfirmSubmit
                      className={dangerButtonClass}
                      formAction={deleteCatalogItem}
                      message={`Naozaj vymazať „${row.name}“?`}
                    >
                      Vymazať
                    </ConfirmSubmit>
                  </>
                }
              />
            ))}

            <div>
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone">
                Pridať do sekcie {section.title}
              </h3>
              <CatalogItemCard
                item={{
                  ...toValues(page.key, section.key),
                  position: sectionRows.length,
                }}
                action={saveCatalogItem}
                submitLabel="Pridať položku"
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}
