import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { catalogPageList } from "@/data/catalog";
import { cardClass } from "@/components/admin/styles";

export const dynamic = "force-dynamic";

export default async function PonukaIndexPage() {
  await requireAdmin();

  const counts = await getPrisma().catalogItem.groupBy({
    by: ["page"],
    _count: { _all: true },
  });

  const countByPage = Object.fromEntries(
    counts.map((row) => [row.page, row._count._all]),
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-[26px] text-espresso">Stála ponuka</h1>
        <p className="mt-1 max-w-[62ch] text-[13px] leading-relaxed text-stone">
          Upravujte položky na stránkach Pečivo, Raňajky, Nápoje a Tradičné jedlá.
          Nadpisy sekcií a fotky ostávajú — menia sa len jedlá a ceny.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {catalogPageList.map((page) => {
          const count = countByPage[page.key] ?? 0;
          return (
            <Link
              key={page.key}
              href={`/admin/ponuka/${page.slug}`}
              className={`${cardClass} block transition-colors hover:border-clay`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone">
                {page.navLabel}
              </p>
              <p className="mt-3 font-display text-[19px] text-espresso">{page.title}</p>
              <p className="mt-1 text-[12px] text-stone">
                {count} {count === 1 ? "položka" : "položiek"} · /{page.slug}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
