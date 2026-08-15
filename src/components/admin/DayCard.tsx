import { AdminForm, type FormAction } from "@/components/admin/AdminForm";
import { cardClass, inputClass, labelClass } from "@/components/admin/styles";
import { COURSE_LABELS, COURSE_ORDER, type Course, type Weekday } from "@/types/menu";
import { weekdayLabel } from "@/lib/week";

export interface DayValues {
  weekday: Weekday;
  dateLabel: string;
  items: Partial<Record<Course, { name: string; allergens: string; price: string }>>;
}

export function DayCard({
  weekId,
  day,
  action,
}: {
  weekId: string;
  day: DayValues;
  action: FormAction;
}) {
  const filled = COURSE_ORDER.filter((course) => day.items[course]?.name).length;

  return (
    <AdminForm action={action} submitLabel="Uložiť deň" className={cardClass}>
      <input type="hidden" name="weekId" value={weekId} />
      <input type="hidden" name="weekday" value={day.weekday} />

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[18px] text-espresso">
          {weekdayLabel(day.weekday)}
          <span className="ml-2 text-[12px] font-normal text-stone">{day.dateLabel}</span>
        </h3>
        <span className="text-[11px] text-stone">
          {filled === 0 ? "Prázdny deň" : `${filled} z 5 položiek`}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <div className="hidden gap-3 sm:grid sm:grid-cols-[150px_1fr_90px_100px]">
          <span className={labelClass}>Chod</span>
          <span className={labelClass}>Názov jedla</span>
          <span className={labelClass}>Alergény</span>
          <span className={labelClass}>Cena (€)</span>
        </div>

        {COURSE_ORDER.map((course) => {
          const value = day.items[course];
          return (
            <div
              key={course}
              className="grid gap-2 sm:grid-cols-[150px_1fr_90px_100px] sm:items-center sm:gap-3"
            >
              <span className="text-[12px] font-medium text-espresso">
                {COURSE_LABELS[course]}
              </span>
              <input
                name={`${course}_name`}
                defaultValue={value?.name ?? ""}
                placeholder="Nechajte prázdne, ak sa nevarí"
                className={inputClass}
                aria-label={`${COURSE_LABELS[course]} — názov`}
              />
              <input
                name={`${course}_allergens`}
                defaultValue={value?.allergens ?? ""}
                placeholder="1,7"
                inputMode="numeric"
                className={inputClass}
                aria-label={`${COURSE_LABELS[course]} — alergény`}
              />
              <input
                name={`${course}_price`}
                defaultValue={value?.price ?? ""}
                placeholder="0,00"
                inputMode="decimal"
                className={inputClass}
                aria-label={`${COURSE_LABELS[course]} — cena`}
              />
            </div>
          );
        })}
      </div>
    </AdminForm>
  );
}
