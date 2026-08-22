import { Container } from "@/components/ui/Container";
import { Button, TextLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { InfoBar } from "@/components/layout/InfoBar";
import { TasteSection } from "@/components/sections/TasteSection";
import { FineClub } from "@/components/sections/FineClub";
import { site } from "@/data/site";

const offerCards = [
  {
    eyebrow: "Obed",
    title: "Denné menu",
    hours: "Ut – Pia  11:00 – 15:00",
    linkLabel: "Denné menu",
    href: "/menu",
    image: "/images/DSC04471-Enhanced-NR.jpg",
  },
  {
    eyebrow: "Ráno",
    title: "Raňajkové menu",
    hours: "Ut – So  7:00 – 11:00",
    linkLabel: "Raňajkové menu",
    href: "/ranajky",
    image: "/images/ranajky (1).png",
  },
  {
    eyebrow: "Špeciality týždňa",
    title: "Týždenné menu",
    hours: "Ut – So  11:00 – 15:00",
    linkLabel: "Týždenné menu",
    href: "/menu",
    image: "/images/IMG_9509_web.jpg",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative">
        <Photo
          src="/images/hero.png"
          alt="Kváskový chlieb a poké bowl na mramorovom stole"
          className="h-[560px] w-full sm:h-[700px]"
          sizes="100vw"
          priority
          overlayClassName="bg-[linear-gradient(180deg,rgba(252,249,241,0.82)_0%,rgba(252,249,241,0.95)_30%,rgba(252,249,241,0.12)_65%,rgba(252,249,241,0)_100%)]"
        />
        <div className="absolute inset-x-0 top-0 flex flex-col items-center px-6 pt-16 text-center sm:pt-24">
          <p className="font-body text-[9px] font-[500] tracking-[0.28em] text-[#A8481F] uppercase">
            Bistro · Pekáreň · Apartmány
          </p>
          <h1 className="font-banner mt-5 max-w-[760px] text-[40px] leading-[1.1] font-[900] tracking-[0.01em] text-espresso uppercase sm:text-[54px]">
            Fine Bakery &amp; Bistro &amp; Apartments
          </h1>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button href={site.orderUrl} variant="outlineFill">
              Objednať online
            </Button>
            <Button href="/menu" variant="outlineFill">
              Pozrieť menu
            </Button>
          </div>
        </div>
      </section>

      <InfoBar />

      <section className="bg-cream py-20">
        <Container>
          <div className="mx-auto max-w-[560px] text-center">
            <h2 className="font-banner text-[30px] leading-[1.15] font-[400] tracking-[0.01em] text-ink uppercase sm:text-[36px]">
              Kuchyňa ktorá sa hýbe s dňom
            </h2>
            <p className="font-body mt-5 text-[12px] leading-[1.9] font-[400] text-stone">
              Doobeda raňajky, čerstvý chlieb či pečivo, na obed denné menu alebo
              týždenné špeciality.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {offerCards.map((card) => (
              <article key={card.title} className="bg-paper">
                <Photo
                  src={card.image}
                  alt={card.title}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-[300px] w-full"
                />
                <div className="px-6 py-7 text-center">
                  <p className="text-[9px] font-semibold tracking-[0.22em] text-rust uppercase">
                    {card.eyebrow}
                  </p>
                  <h3 className="font-banner mt-3 text-[17px] font-[400] tracking-[0.04em] text-ink uppercase">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[11px] text-stone">{card.hours}</p>
                  <div className="mt-6 border-t border-hairline pt-5">
                    <TextLink href={card.href}>{card.linkLabel}</TextLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream-dark py-16">
        <Container className="space-y-6">
          <div className="grid items-stretch md:grid-cols-2">
            <Photo
              src="/images/hf_20260810_121215_ea2f305d-93dd-429a-80e6-52a759941a47.png"
              alt="Remeselný chlieb a pečivo"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-[300px] w-full md:h-[420px]"
            />
            <div className="flex flex-col justify-center bg-paper px-9 py-12 text-center md:px-14">
              <h2 className="font-display text-[26px] leading-[1.2] font-bold tracking-[0.01em] text-ink uppercase [text-shadow:0_4px_4px_rgba(0,0,0,0.25)] sm:text-[30px]">
                Pečenie je pre nás{" "}
                <span className="text-rust italic">remeslom</span>
              </h2>
              <p className="font-body mt-5 text-[11.5px] leading-[1.9] font-[400] text-[#000000]">
                Pečenie je pre nás remeslo, nie výroba. Dávame mu čas na pomalé kvasenie, vyberáme
                suroviny, na ktorých naozaj záleží, a k pečivu pristupujeme rovnako precízne ako
                ku každému jedlu na tanieri.
              </p>
              <div className="mt-7 flex justify-center">
                <Button href="/bakery-bistro" shape="pill">
                  Pozrieť pečivo
                </Button>
              </div>
            </div>
          </div>

          <div className="grid items-stretch md:grid-cols-2">
            <div className="order-2 flex flex-col justify-center bg-paper px-9 py-12 text-center md:order-1 md:px-14">
              <p className="font-display text-[24px] leading-none font-bold text-rust uppercase italic [text-shadow:0_4px_4px_rgba(0,0,0,0.25)] sm:text-[26px]">
                Objavte
              </p>
              <h2 className="font-display mt-2 text-[26px] leading-[1.2] font-bold tracking-[0.01em] text-ink uppercase [text-shadow:0_4px_4px_rgba(0,0,0,0.25)] sm:text-[30px]">
                Naše menu
              </h2>
              <p className="font-body mt-5 text-[11.5px] leading-[1.9] font-[400] text-[#000000]">
                Od poctivého denného obeda, Fine tradičných jedál až po týždenné špeciality zo
                všetkých kútov sveta. Nech varíme čokoľvek, robíme to tak, ako sa ozaj patrí, od
                výberu kvalitných surovín až po posledný detail na tanieri.
              </p>
              <div className="mt-7 flex justify-center">
                <Button href="/menu" shape="pill">
                  Pozrieť menu
                </Button>
              </div>
            </div>
            <Photo
              src="/images/IMG_9509_web.jpg"
              alt="Ázijské špeciality na stole"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="order-1 h-[300px] w-full md:order-2 md:h-[420px]"
            />
          </div>
        </Container>
      </section>

      <TasteSection />

      <section className="relative">
        <Photo
          src="/images/hf_20260806_121429_5064890d-ca32-4623-8809-f2c6dfde4537.png"
          alt="Pekár s plechom čerstvého chleba"
          className="h-[420px] w-full sm:h-[500px]"
          sizes="100vw"
          overlayClassName="bg-[linear-gradient(180deg,rgba(39,27,16,0.58)_0%,rgba(39,27,16,0.78)_100%)]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="font-body text-[13px] leading-none font-[500] tracking-[1.5px] text-[#D4835A]">
            Fine Bakery
          </p>
          <h2 className="font-banner mt-4 max-w-[640px] text-[56px] leading-[64px] font-[700] tracking-[-1.5px] text-[#F6EFE1]">
            Tradičná chuť s citom pre inováciu
          </h2>
          <p className="mt-4 max-w-[480px] text-[13px] leading-relaxed text-paper/85">
            Moderný a inovatívny prístup k remeslu
          </p>
          <TextLink href="/o-nas" className="mt-8 text-paper hover:text-cream-dark">
            O nás
          </TextLink>
        </div>
      </section>

      <FineClub />
    </>
  );
}
