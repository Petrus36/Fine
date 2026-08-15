import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { formatWeekRange } from "@/lib/week";
import { cardClass } from "@/components/admin/styles";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const user = await requireAdmin();
  const prisma = getPrisma();

  const [publishedWeek, weekCount, dishCount, alert] = await Promise.all([
    prisma.menuWeek.findFirst({
      where: { published: true },
      select: { year: true, weekNumber: true },
    }),
    prisma.menuWeek.count(),
    prisma.weeklyDish.count({ where: { active: true } }),
    prisma.alertWindow.findFirst({
      orderBy: { createdAt: "desc" },
      select: { active: true, title: true },
    }),
  ]);

  const cards = [
    {
      href: "/admin/denne-menu",
      title: "Denné menu",
      value: publishedWeek
        ? `Týždeň ${publishedWeek.weekNumber} / ${publishedWeek.year}`
        : "Nič nie je zverejnené",
      note: publishedWeek
        ? formatWeekRange(publishedWeek.year, publishedWeek.weekNumber)
        : `Máte ${weekCount} pripravených týždňov`,
    },
    {
      href: "/admin/tyzdenne-menu",
      title: "Týždenné menu",
      value: `${dishCount} ${dishCount === 1 ? "jedlo" : "jedál"} na webe`,
      note: "Jedlá v ponuke celý týždeň",
    },
    {
      href: "/admin/upozornenie",
      title: "Upozornenie",
      value: alert?.active ? "Zapnuté" : "Vypnuté",
      note: alert?.title ?? "Zatiaľ nevytvorené",
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-[26px] text-espresso">
          Dobrý deň{user.name ? `, ${user.name}` : ""}
        </h1>
        <p className="mt-1 text-[13px] text-stone">
          Odtiaľto upravíte menu aj upozornenie na webe.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`${cardClass} block transition-colors hover:border-clay`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone">
              {card.title}
            </p>
            <p className="mt-3 font-display text-[19px] leading-tight text-espresso">
              {card.value}
            </p>
            <p className="mt-1 text-[12px] text-stone">{card.note}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
