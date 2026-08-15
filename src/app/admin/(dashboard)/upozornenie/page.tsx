import Image from "next/image";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { deleteAlert, saveAlert } from "./actions";
import { AdminForm } from "@/components/admin/AdminForm";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { Field } from "@/components/admin/Field";
import { ImageInput } from "@/components/admin/ImageInput";
import { cardClass, dangerButtonClass, inputClass } from "@/components/admin/styles";

export const dynamic = "force-dynamic";

function toDateInput(value: Date | null): string {
  return value ? value.toISOString().slice(0, 10) : "";
}

export default async function AlertPage() {
  await requireAdmin();

  const alert = await getPrisma().alertWindow.findFirst({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-[26px] text-espresso">Upozornenie</h1>
        <p className="mt-1 max-w-[62ch] text-[13px] leading-relaxed text-stone">
          Vyskakovacie okno s obrázkom a textom. Návštevníkovi sa zobrazí raz —
          po zatvorení ho uvidí až vtedy, keď upozornenie zmeníte.
        </p>
      </header>

      <AdminForm
        action={saveAlert}
        submitLabel="Uložiť upozornenie"
        className={cardClass}
        extraFooter={
          alert ? (
            <ConfirmSubmit
              className={dangerButtonClass}
              formAction={deleteAlert}
              message="Naozaj vymazať upozornenie?"
            >
              Vymazať
            </ConfirmSubmit>
          ) : null
        }
      >
        {alert ? <input type="hidden" name="id" value={alert.id} /> : null}

        <div className="space-y-5">
          <label className="flex items-center gap-3 rounded-[4px] bg-cream-dark px-4 py-3 text-[13px] text-ink">
            <input
              type="checkbox"
              name="active"
              defaultChecked={alert?.active ?? false}
              className="size-4 accent-[var(--color-clay)]"
            />
            Zobraziť upozornenie na webe
          </label>

          <Field label="Nadpis">
            <input
              name="title"
              defaultValue={alert?.title ?? ""}
              required
              className={inputClass}
              placeholder="Napríklad Veľkonočná ponuka"
            />
          </Field>

          <Field label="Text">
            <textarea
              name="body"
              defaultValue={alert?.body ?? ""}
              rows={4}
              required
              className={`${inputClass} resize-y`}
              placeholder="Čo chcete návštevníkom oznámiť."
            />
          </Field>

          <div className="space-y-3">
            <Field
              label="Obrázok"
              hint="JPG, PNG, WEBP alebo GIF, maximálne 3 MB."
              htmlFor="image"
            >
              <ImageInput id="image" name="image" />
            </Field>

            {alert?.imageUrl ? (
              <div className="flex flex-wrap items-center gap-4">
                <Image
                  src={alert.imageUrl}
                  alt="Aktuálny obrázok upozornenia"
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
                  Odstrániť obrázok
                </label>
              </div>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Text tlačidla" hint="Nepovinné.">
              <input
                name="buttonLabel"
                defaultValue={alert?.buttonLabel ?? ""}
                className={inputClass}
                placeholder="Pozrieť ponuku"
              />
            </Field>
            <Field label="Odkaz tlačidla" hint="Napríklad /menu alebo celá adresa.">
              <input
                name="buttonUrl"
                defaultValue={alert?.buttonUrl ?? ""}
                className={inputClass}
                placeholder="/menu"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Zobrazovať od" hint="Nepovinné.">
              <input
                name="startsAt"
                type="date"
                defaultValue={toDateInput(alert?.startsAt ?? null)}
                className={inputClass}
              />
            </Field>
            <Field label="Zobrazovať do" hint="Vrátane tohto dňa.">
              <input
                name="endsAt"
                type="date"
                defaultValue={toDateInput(alert?.endsAt ?? null)}
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </AdminForm>
    </div>
  );
}
