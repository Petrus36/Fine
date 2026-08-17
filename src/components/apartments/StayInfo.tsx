import { Container } from "@/components/ui/Container";
import { apartmentStay } from "@/data/apartments";

export function StayInfo() {
  return (
    <section className="bg-cream pb-16">
      <Container>
        <h2 className="text-center font-display text-[28px] font-normal text-espresso sm:text-[34px]">
          Príchod a odchod
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="rounded-[6px] bg-cream-dark px-8 py-10">
            <h3 className="font-display text-[22px] text-espresso">{apartmentStay.rulesTitle}</h3>
            <ul className="mt-5 space-y-2 text-[13px] leading-relaxed text-stone">
              {apartmentStay.rules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-[6px] bg-cream-dark px-8 py-10">
            <h3 className="font-display text-[22px] text-espresso">{apartmentStay.checkinTitle}</h3>
            <ul className="mt-5 space-y-2 text-[13px] leading-relaxed text-stone">
              {apartmentStay.checkin.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}
