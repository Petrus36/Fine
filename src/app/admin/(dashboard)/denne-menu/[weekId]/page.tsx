import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { dateOfWeekday, formatWeekRange, WEEKDAY_ORDER } from "@/lib/week";
import { priceToInput } from "@/lib/admin-parse";
import { deleteWeek, saveDay, setWeekPublished, updateWeekNote } from "../actions";
import { DayCard, type DayValues } from "@/components/admin/DayCard";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { Field } from "@/components/admin/Field";
import {
  buttonClass,
  cardClass,
  dangerButtonClass,
  ghostButtonClass,
  inputClass,
} from "@/components/admin/styles";
import type { Course, Weekday } from "@/types/menu";

export const dynamic = "force-dynamic";

const dayNumber = new Intl.DateTimeFormat("sk-SK", {
  day: "numeric",
  month: "numeric",
  timeZone: "UTC",
});

export default async function WeekEditorPage({
  params,
}: {
  params: Promise<{ weekId: string }>;
}) {
  await requireAdmin();
  const { weekId } = await params;

  const week = await getPrisma().menuWeek.findUnique({
    where: { id: weekId },
    include: { days: { include: { items: true } } },
  });

  if (!week) notFound();

  const days: DayValues[] = WEEKDAY_ORDER.map((weekday: Weekday) => {
    const stored = week.days.find((day) => day.weekday === weekday);
    const items: DayValues["items"] = {};

    for (const item of stored?.items ?? []) {
      items[item.course as Course] = {
        name: item.name,
        allergens: item.allergens.join(","),
        price: priceToInput(item.price),
      };
    }

    return {
      weekday,
      dateLabel: dayNumber.format(dateOfWeekday(week.year, week.weekNumber, weekday)),
      items,
    };
  });

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/denne-menu" className="text-[11px] uppercase tracking-[0.14em] text-stone hover:text-clay">
          ← Späť na týždne
        </Link>
        <h1 className="mt-3 font-display text-[26px] text-espresso">
          Týždeň {week.weekNumber} / {week.year}
        </h1>
        <p className="mt-1 text-[13px] text-stone">
          {formatWeekRange(week.year, week.weekNumber)}
        </p>
      </div>

      <section className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-espresso">
              {week.published
                ? "Tento týždeň je zverejnený na webe."
                : "Tento týždeň je len koncept — na webe sa nezobrazuje."}
            </p>
            <p className="mt-1 text-[12px] text-stone">
              Zverejnený môže byť vždy len jeden týždeň.
            </p>
          </div>
          <form action={setWeekPublished}>
            <input type="hidden" name="weekId" value={week.id} />
            <input type="hidden" name="published" value={week.published ? "false" : "true"} />
            <button type="submit" className={week.published ? ghostButtonClass : buttonClass}>
              {week.published ? "Skryť z webu" : "Zverejniť na webe"}
            </button>
          </form>
        </div>

        <form action={updateWeekNote} className="mt-6 border-t border-hairline pt-6">
          <input type="hidden" name="weekId" value={week.id} />
          <Field
            label="Poznámka k týždňu"
            htmlFor="note"
            hint="Interná poznámka, na web sa nezobrazuje."
          >
            <input
              id="note"
              name="note"
              defaultValue={week.note ?? ""}
              className={inputClass}
            />
          </Field>
          <button type="submit" className={`${ghostButtonClass} mt-3`}>
            Uložiť poznámku
          </button>
        </form>
      </section>

      <section className="space-y-4">
        {days.map((day) => (
          <DayCard key={day.weekday} weekId={week.id} day={day} action={saveDay} />
        ))}
      </section>

      <section className="border-t border-hairline pt-6">
        <form action={deleteWeek}>
          <input type="hidden" name="weekId" value={week.id} />
          <ConfirmSubmit
            className={dangerButtonClass}
            message={`Naozaj vymazať týždeň ${week.weekNumber}/${week.year} aj so všetkými jedlami?`}
          >
            Vymazať celý týždeň
          </ConfirmSubmit>
        </form>
      </section>
    </div>
  );
}
