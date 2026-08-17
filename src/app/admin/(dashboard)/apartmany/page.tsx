import { requireAdmin } from "@/lib/auth";
import { getApartmentPage } from "@/lib/get-apartments";
import { saveApartmentPrices } from "./actions";
import { AdminForm } from "@/components/admin/AdminForm";
import { Field } from "@/components/admin/Field";
import { cardClass, inputClass } from "@/components/admin/styles";

export const dynamic = "force-dynamic";

export default async function ApartmentsAdminPage() {
  await requireAdmin();
  const { apartments, settings } = await getApartmentPage();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-[26px] text-espresso">Apartmány</h1>
        <p className="mt-1 max-w-[62ch] text-[13px] leading-relaxed text-stone">
          Denné ceny sa zobrazia na stránke Apartmány. Ostatný text a fotky upravíme
          neskôr.
        </p>
      </header>

      <AdminForm action={saveApartmentPrices} submitLabel="Uložiť cenník" className={cardClass}>
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {apartments.map((apartment) => (
              <Field key={apartment.id} label={`${apartment.name} — € / deň`}>
                <input
                  name={`price-${apartment.id}`}
                  defaultValue={apartment.pricePerDay.toFixed(2)}
                  inputMode="decimal"
                  required
                  className={inputClass}
                />
              </Field>
            ))}
          </div>

          <div className="grid gap-4 border-t border-hairline pt-6 sm:grid-cols-2">
            <Field label="Ďalšia osoba — € / deň">
              <input
                name="extraPersonPerDay"
                defaultValue={settings.extraPersonPerDay.toFixed(2)}
                inputMode="decimal"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Upratovanie na požiadanie — €">
              <input
                name="cleaningFee"
                defaultValue={settings.cleaningFee.toFixed(2)}
                inputMode="decimal"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Platnosť cenníka" className="sm:col-span-2">
              <input
                name="validFrom"
                defaultValue={settings.validFrom}
                required
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </AdminForm>
    </div>
  );
}
