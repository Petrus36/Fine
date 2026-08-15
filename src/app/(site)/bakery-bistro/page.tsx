import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button, TextLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { InfoBar } from "@/components/layout/InfoBar";
import { TasteSection } from "@/components/sections/TasteSection";
import { FineClub } from "@/components/sections/FineClub";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Bakery & Bistro",
  description:
    "Pekáreň, kuchyňa a nápoje pod jednou strechou — každá karta vedie ku kompletnej ponuke.",
};

const featureCards = [
  {
    title: "Menu",
    description: "Denné menu a týždenné špeciality",
    linkLabel: "Pozrieť menu",
    href: "/menu",
    image: "/images/DSC04471-Enhanced-NR.jpg",
  },
  {
    title: "Pečivo a chlieb",
    description: "Remeselné pečivo a chlieb",
    linkLabel: "Pozrieť pečivo",
    href: "/pecivo",
    image: "/images/hf_20260810_121215_ea2f305d-93dd-429a-80e6-52a759941a47.png",
  },
];

const smallCards: Array<{
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  image: string;
  imageClassName?: string;
}> = [
  {
    title: "Tradičné jedlá",
    description: "Klasika, ktorú u nás nájdete po celý deň, aj mimo denného menu.",
    linkLabel: "Pozrieť à la carte",
    href: "/a-la-carte",
    image: "/images/img1532_full.png",
  },
  {
    title: "Raňajkové menu",
    description: "Otvárame s raňajkami, ktoré si poskladáte podľa chuti.",
    linkLabel: "Pozrieť raňajky",
    href: "/ranajky",
    image: "/images/ranajky (1).png",
  },
  {
    title: "Nápojový lístok",
    description: "Káva, limonády, vína aj koktaily miešané u nás.",
    linkLabel: "Pozrieť nápoje",
    href: "/napoje",
    image: "/images/limonady-5.jpg",
    imageClassName: "object-[center_72%]",
  },
  {
    title: "Akcie",
    description: "Čo u nás práve beží.",
    linkLabel: "Pozrieť akcie",
    href: "/akcie",
    image: "/images/unnamed.jpg",
  },
];

export default function BakeryBistroPage() {
  return (
    <>
      <section className="relative">
        <Photo
          src="/images/hf_20260809_130142_f4761bae-5277-4f3e-b424-8fa9df9b29d3.png"
          alt="Pečivo a jedlá Fine Bakery & Bistro"
          className="h-[400px] w-full sm:h-[460px]"
          imageClassName="object-center"
          overlayClassName="bg-[linear-gradient(180deg,rgba(39,27,16,0.35)_0%,rgba(39,27,16,0.55)_100%)]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-[38px] leading-none font-normal tracking-[0.02em] text-paper uppercase drop-shadow-[0_2px_12px_rgba(39,27,16,0.25)] sm:text-[52px]">
            Bakery{" "}
            <span className="relative mx-1.5 inline-flex h-[0.68em] w-[0.68em] -translate-y-[0.03em] items-center justify-center rounded-full border border-paper/80 text-[0.52em] leading-none">
              &amp;
            </span>{" "}
            Bistro
          </h1>
          <p className="mt-5 max-w-[440px] text-[12px] leading-[1.75] text-paper/95 drop-shadow-[0_1px_6px_rgba(39,27,16,0.2)]">
            Pekáreň, kuchyňa a nápoje pod jednou strechou,
            <br />
            každá karta vedie na kompletnú ponuku.
          </p>
        </div>
      </section>

      <InfoBar />

      <section className="bg-cream py-14">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {featureCards.map((card) => (
              <article key={card.title} className="bg-paper">
                <Photo
                  src={card.image}
                  alt={card.title}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-[320px] w-full"
                />
                <div className="px-8 py-7 text-center">
                  <h2 className="font-display text-[19px] leading-none font-normal text-ink">
                    {card.title}
                  </h2>
                  <p className="mt-2.5 text-[11.5px] text-stone">{card.description}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
                    <TextLink href={card.href}>{card.linkLabel}</TextLink>
                    <Button href={site.orderUrl} size="sm">
                      Objednať online
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {smallCards.map((card) => (
              <article key={card.title} className="flex flex-col bg-paper">
                <Photo
                  src={card.image}
                  alt={card.title}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="h-[230px] w-full"
                  imageClassName={card.imageClassName}
                />
                <div className="flex flex-1 flex-col px-6 py-6 text-center">
                  <h3 className="font-display text-[16px] leading-none font-normal text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-[11px] leading-relaxed text-stone">
                    {card.description}
                  </p>
                  <div className="mt-auto pt-5">
                    <TextLink href={card.href}>{card.linkLabel}</TextLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <TasteSection />

      <FineClub tone="dark" />
    </>
  );
}
