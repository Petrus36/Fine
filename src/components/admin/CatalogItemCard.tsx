import { AdminForm, type FormAction } from "@/components/admin/AdminForm";
import { Field } from "@/components/admin/Field";
import { cardClass, inputClass } from "@/components/admin/styles";

export interface CatalogItemValues {
  id: string;
  page: string;
  section: string;
  name: string;
  description: string;
  category: string;
  allergens: string;
  portion: string;
  price: string;
  priceAlt: string;
  position: number;
  active: boolean;
}

export function CatalogItemCard({
  item,
  action,
  submitLabel,
  footer,
}: {
  item: CatalogItemValues;
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
      {item.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <input type="hidden" name="page" value={item.page} />
      <input type="hidden" name="section" value={item.section} />

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-[1fr_120px_110px]">
          <Field label="Názov">
            <input
              name="name"
              defaultValue={item.name}
              required
              className={inputClass}
              placeholder="Napríklad Croissant"
            />
          </Field>
          <Field label="Cena (€)">
            <input
              name="price"
              defaultValue={item.price}
              inputMode="decimal"
              placeholder="4,20"
              className={inputClass}
            />
          </Field>
          <Field label="Cena 2 (€)" hint="Druhá veľkosť, napr. limonáda.">
            <input
              name="priceAlt"
              defaultValue={item.priceAlt}
              inputMode="decimal"
              placeholder="7,20"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Skupina" hint="Napríklad KLASICKÝ. Sekcia ostáva rovnaká.">
            <input
              name="category"
              defaultValue={item.category}
              className={inputClass}
              placeholder="KLASICKÝ"
            />
          </Field>
          <Field label="Hmotnosť / objem">
            <input
              name="portion"
              defaultValue={item.portion}
              className={inputClass}
              placeholder="200 g"
            />
          </Field>
          <Field label="Alergény">
            <input
              name="allergens"
              defaultValue={item.allergens}
              inputMode="numeric"
              placeholder="1,3,7"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Popis" hint="Nepovinné. Zobrazí sa pod názvom.">
          <textarea
            name="description"
            defaultValue={item.description}
            rows={2}
            className={`${inputClass} resize-y`}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-[110px_1fr]">
          <Field label="Poradie">
            <input
              name="position"
              type="number"
              defaultValue={item.position}
              className={inputClass}
            />
          </Field>
          <Field label="Zobrazenie">
            <label className="flex h-[38px] items-center gap-2 text-[13px] text-ink">
              <input
                type="checkbox"
                name="active"
                defaultChecked={item.active}
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
