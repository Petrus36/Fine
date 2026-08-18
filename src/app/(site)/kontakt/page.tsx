import type { Metadata } from "next";
import { Photo } from "@/components/ui/Photo";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";
import { contactCards, contactHero } from "@/data/contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Adresa, otváracie hodiny a kontakt na Fine Bakery & Bistro. Napíšte nám alebo zavolajte.",
};

function CardIcon({ name }: { name: string }) {
  const common = "h-7 w-7 stroke-clay";

  if (name === "address") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <path
          d="M12 21s6.5-5.2 6.5-10.2A6.5 6.5 0 0 0 12 4.3a6.5 6.5 0 0 0-6.5 6.5C5.5 15.8 12 21 12 21Z"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="10.8" r="1.8" strokeWidth="1.5" />
      </svg>
    );
  }

  if (name === "contact") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <rect x="3.5" y="6" width="17" height="12" rx="1.6" strokeWidth="1.5" />
        <path d="m4.2 7.2 7.8 6.2 7.8-6.2" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
      <circle cx="12" cy="12" r="8.2" strokeWidth="1.5" />
      <path d="M12 7.5V12l3.2 2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function KontaktPage() {
  return (
    <>
      <section className="relative">
        <Photo
          src={contactHero.src}
          alt={contactHero.alt}
          className="h-[320px] w-full sm:h-[380px]"
          imageClassName={contactHero.imageClassName}
          sizes="100vw"
          priority
          overlayClassName="bg-[linear-gradient(180deg,rgba(39,27,16,0.42)_0%,rgba(39,27,16,0.55)_100%)]"
        />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <h1 className="font-banner text-[40px] leading-none font-bold tracking-[0.04em] text-paper uppercase drop-shadow-[0_2px_12px_rgba(39,27,16,0.25)] sm:text-[64px]">
            {contactHero.title}
          </h1>
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {contactCards.map((card) => (
              <article
                key={card.key}
                className="rounded-[10px] bg-paper px-6 py-8 text-center"
              >
                <div className="flex justify-center">
                  <CardIcon name={card.key} />
                </div>
                <p className="font-banner mt-4 text-[18px] font-normal tracking-[0.06em] text-clay uppercase sm:text-[20px]">
                  {card.title}
                </p>
                <div className="mx-auto mt-3 h-px w-10 bg-clay/70" />
                {"lines" in card ? (
                  <div className="font-body mt-4 space-y-1.5 text-[13px] leading-relaxed font-normal text-stone">
                    {card.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : (
                  <div className="font-body mx-auto mt-4 inline-grid grid-cols-[auto_auto] gap-x-8 gap-y-1 text-left font-normal">
                    {card.hours.map((row) => (
                      <div key={row.day} className="contents">
                        <span className="text-[13px] font-[400] text-ink lowercase">
                          {row.day}
                        </span>
                        <span className="text-[13px] font-[400] text-ink lowercase">
                          {row.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-[640px]">
            <ContactForm />
          </div>
        </Container>
      </section>

      <ContactMap />
    </>
  );
}
