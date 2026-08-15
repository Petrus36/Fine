import { AdminForm, type FormAction } from "@/components/admin/AdminForm";
import { Field } from "@/components/admin/Field";
import { cardClass, inputClass } from "@/components/admin/styles";

export interface DishValues {
  id: string;
  name: string;
  description: string;
  allergens: string;
  price: string;
  options: string;
  position: number;
  active: boolean;
}

export function DishCard({
  dish,
  action,
  submitLabel,
  footer,
}: {
  dish: DishValues;
  action: FormAction;
  submitLabel: string;
  footer?: React.ReactNode;
}) {
  return (
    <AdminForm
      action={action}
      submitLabel={submitLabel}
      className={cardClass}
      extraFooter={footer}
    >
      {dish.id ? <input type="hidden" name="id" value={dish.id} /> : null}

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_120px_110px]">
          <Field label="Názov jedla">
            <input
              name="name"
              defaultValue={dish.name}
              required
              className={inputClass}
              placeholder="Napríklad Poké bowl"
            />
          </Field>
          <Field label="Cena (€)">
            <input
              name="price"
              defaultValue={dish.price}
              inputMode="decimal"
              placeholder="9,90"
              className={inputClass}
            />
          </Field>
          <Field label="Alergény">
            <input
              name="allergens"
              defaultValue={dish.allergens}
              inputMode="numeric"
              placeholder="1,4,6"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Popis">
          <textarea
            name="description"
            defaultValue={dish.description}
            rows={3}
            className={`${inputClass} resize-y`}
            placeholder="Krátky popis, ktorý sa zobrazí pod názvom."
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-[1fr_110px_130px]">
          <Field label="Na výber" hint="Možnosti oddeľte čiarkou.">
            <input
              name="options"
              defaultValue={dish.options}
              className={inputClass}
              placeholder="kuracie, hovädzie, tofu"
            />
          </Field>
          <Field label="Poradie" hint="Menšie číslo = vyššie.">
            <input
              name="position"
              type="number"
              defaultValue={dish.position}
              className={inputClass}
            />
          </Field>
          <Field label="Zobrazenie">
            <label className="flex h-[38px] items-center gap-2 text-[13px] text-ink">
              <input
                type="checkbox"
                name="active"
                defaultChecked={dish.active}
                className="size-4 accent-[var(--color-clay)]"
              />
              Zobraziť na webe
            </label>
          </Field>
        </div>
      </div>
    </AdminForm>
  );
}
