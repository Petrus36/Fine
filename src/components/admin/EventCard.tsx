import { UploadedImage } from "@/components/ui/UploadedImage";
import { AdminForm, type FormAction } from "@/components/admin/AdminForm";
import { Field } from "@/components/admin/Field";
import { ImageInput } from "@/components/admin/ImageInput";
import { cardClass, inputClass } from "@/components/admin/styles";

export interface EventValues {
  id: string;
  title: string;
  body: string;
  imageUrl: string | null;
  position: number;
  active: boolean;
}

export function EventCard({
  event,
  action,
  submitLabel,
  footer,
}: {
  event: EventValues;
  action: FormAction;
  submitLabel: string;
  footer?: React.ReactNode;
}) {
  const imageInputId = `image-${event.id || "new"}`;

  return (
    <AdminForm
      action={action}
      submitLabel={submitLabel}
      className={cardClass}
      extraFooter={footer}
    >
      {event.id ? <input type="hidden" name="id" value={event.id} /> : null}

      <div className="space-y-4">
        <Field label="Nadpis akcie">
          <input
            name="title"
            defaultValue={event.title}
            required
            className={inputClass}
            placeholder="Napríklad Degustácia kváskového chleba"
          />
        </Field>

        <Field label="Text">
          <textarea
            name="body"
            defaultValue={event.body}
            rows={4}
            required
            className={`${inputClass} resize-y`}
            placeholder="Čo sa na akcii deje, kedy a pre koho."
          />
        </Field>

        <div className="space-y-3">
          <Field
            label="Fotka"
            hint="JPG, PNG, WEBP alebo GIF, maximálne 3 MB."
            htmlFor={imageInputId}
          >
            <ImageInput id={imageInputId} name="image" />
          </Field>

          {event.imageUrl ? (
            <div className="flex flex-wrap items-center gap-4">
              <UploadedImage
                src={event.imageUrl}
                alt={event.title || "Fotka akcie"}
                width={160}
                height={110}
                className="h-[110px] w-[160px] rounded-[4px] object-cover"
              />
              <label className="flex items-center gap-2 text-[12px] text-stone">
                <input
                  type="checkbox"
                  name="removeImage"
                  className="size-4 accent-[var(--color-clay)]"
                />
                Odstrániť fotku
              </label>
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Poradie" hint="Menšie číslo = vyššie na stránke.">
            <input
              name="position"
              type="number"
              defaultValue={event.position}
              className={inputClass}
            />
          </Field>
          <Field label="Zobrazenie">
            <label className="flex h-[38px] items-center gap-2 text-[13px] text-ink">
              <input
                type="checkbox"
                name="active"
                defaultChecked={event.active}
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
