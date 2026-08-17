import { Container } from "@/components/ui/Container";
import { formatEuro } from "@/lib/format";
import { apartmentIncludes } from "@/data/apartments";
import type { Apartment, ApartmentSettings } from "@/types/apartments";

export function PriceList({
  apartments,
  settings,
}: {
  apartments: Apartment[];
  settings: ApartmentSettings;
}) {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container>
        <h2 className="font-banner text-center text-[28px] font-normal text-espresso sm:text-[34px]">
          Cenník apartmánov
        </h2>
        <p className="mt-2 text-center text-[12px] text-stone">{settings.validFrom}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {apartments.map((apartment) => (
            <article
              key={apartment.id}
              className="rounded-[6px] border border-hairline bg-paper px-6 py-8 text-center"
            >
              <h3 className="font-display text-[20px] text-espresso">{apartment.name}</h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-stone">
                max. {apartment.maxGuests} {apartment.maxGuests === 1 ? "osoba" : "osoby"}
              </p>
              <p className="mt-5 font-display text-[26px] leading-none text-espresso">
                {formatEuro(apartment.pricePerDay)}
                <span className="ml-1 text-[13px] text-stone">/ deň</span>
              </p>
              <p className="mt-3 text-[11px] leading-relaxed text-stone">{apartment.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-10 border-t border-hairline/80 pt-10 md:grid-cols-2">
          <div>
            <h3 className="font-display text-[20px] text-espresso">Cena zahŕňa</h3>
            <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-stone">
              {apartmentIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-[20px] text-espresso">Príplatky</h3>
            <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-stone">
              <li>
                Každá ďalšia osoba v apartmáne: {formatEuro(settings.extraPersonPerDay)} / deň
              </li>
              <li>
                Upratovanie a výmena bielizne na požiadanie (2 osoby):{" "}
                {formatEuro(settings.cleaningFee)}
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
