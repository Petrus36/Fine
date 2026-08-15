import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { formatWeekRange, isoWeekOf } from "@/lib/week";
import { currentDate } from "@/lib/now";
import { createWeek } from "./actions";
import { AdminForm } from "@/components/admin/AdminForm";
import { Field } from "@/components/admin/Field";
import { cardClass, inputClass } from "@/components/admin/styles";

export const dynamic = "force-dynamic";

export default async function DailyMenuPage() {
  await requireAdmin();

  const today = await currentDate();
  const nextWeek = isoWeekOf(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000));

  const weeks = await getPrisma().menuWeek.findMany({
    orderBy: [{ year: "desc" }, { weekNumber: "desc" }],
    include: { _count: { select: { days: true } } },
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-[26px] text-espresso">Denné menu</h1>
        <p className="mt-1 max-w-[62ch] text-[13px] leading-relaxed text-stone">
          Menu sa zadáva po týždňoch. Na webe sa zobrazuje ten týždeň, ktorý je
          označený ako zverejnený.
        </p>
      </header>

      <section className={cardClass}>
        <h2 className="font-display text-[17px] text-espresso">Nový týždeň</h2>
        <AdminForm action={createWeek} submitLabel="Vytvoriť týždeň" className="mt-4">
          <div className="flex flex-wrap gap-4">
            <Field label="Číslo týždňa" htmlFor="weekNumber" className="w-[140px]">
              <input
                id="weekNumber"
                name="weekNumber"
                type="number"
                min={1}
                max={53}
                defaultValue={nextWeek.week}
                required
                className={inputClass}
              />
            </Field>
            <Field label="Rok" htmlFor="year" className="w-[140px]">
              <input
                id="year"
                name="year"
                type="number"
                min={2020}
                max={2100}
                defaultValue={nextWeek.year}
                required
                className={inputClass}
              />
            </Field>
          </div>
        </AdminForm>
      </section>

      <section>
        <h2 className="font-display text-[17px] text-espresso">Týždne</h2>
        {weeks.length === 0 ? (
          <p className="mt-3 text-[13px] text-stone">
            Zatiaľ nemáte žiadny týždeň. Vytvorte prvý vyššie.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {weeks.map((week) => (
              <li key={week.id}>
                <Link
                  href={`/admin/denne-menu/${week.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-[6px] border border-hairline bg-paper px-5 py-4 transition-colors hover:border-clay"
                >
                  <span>
                    <span className="text-[14px] font-medium text-espresso">
                      Týždeň {week.weekNumber} / {week.year}
                    </span>
                    <span className="ml-3 text-[12px] text-stone">
                      {formatWeekRange(week.year, week.weekNumber)}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[11px] text-stone">
                      {week._count.days} {week._count.days === 1 ? "deň" : "dní"}
                    </span>
                    <span
                      className={
                        week.published
                          ? "rounded-full bg-clay px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper"
                          : "rounded-full bg-cream-dark px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone"
                      }
                    >
                      {week.published ? "Zverejnené" : "Koncept"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
