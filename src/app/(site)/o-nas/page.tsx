import type { Metadata } from "next";
import { Photo } from "@/components/ui/Photo";
import { Container } from "@/components/ui/Container";
import { PolaroidCollage } from "@/components/about/PolaroidCollage";
import { StoryRow } from "@/components/about/StoryRow";
import { TasteSection } from "@/components/sections/TasteSection";
import { aboutHero, aboutIntro, aboutQuote, aboutStories } from "@/data/about";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "Fine Bakery & Bistro v Trenčíne — roky varíme, ponovom aj pečieme. Remeselný chlieb, kuchyňa a apartmány pod jednou strechou.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative">
        <Photo
          src={aboutHero.src}
          alt={aboutHero.alt}
          className="h-[380px] w-full sm:h-[460px]"
          sizes="100vw"
          priority
          overlayClassName="bg-[linear-gradient(180deg,rgba(39,27,16,0.35)_0%,rgba(39,27,16,0.55)_100%)]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="font-banner max-w-[780px] text-[32px] leading-[1.1] font-bold tracking-[0.04em] text-paper uppercase drop-shadow-[0_2px_12px_rgba(39,27,16,0.25)] sm:text-[48px]">
            {aboutHero.title}
          </h1>
          <p className="mt-4 max-w-[420px] font-display text-[15px] leading-relaxed text-paper/90 sm:text-[17px]">
            {aboutHero.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-clay uppercase">
                {aboutIntro.eyebrow}
              </p>
              <h2 className="font-banner mt-3 text-[28px] leading-[1.15] font-[600] tracking-[0.02em] text-espresso uppercase sm:text-[36px]">
                {aboutIntro.title}
              </h2>
              <div className="font-body mt-6 space-y-4 text-[13px] leading-[1.9] text-stone">
                {aboutIntro.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </div>
            <PolaroidCollage />
          </div>
        </Container>
      </section>

      <section className="bg-cream-dark py-16 sm:py-20">
        <Container className="max-w-[720px] text-center">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-clay uppercase">
            {aboutQuote.eyebrow}
          </p>
          <h2 className="font-banner mt-4 text-[30px] leading-[1.2] font-[600] tracking-[0.02em] text-espresso uppercase sm:text-[38px]">
            {aboutQuote.title}
          </h2>
        </Container>
      </section>

      <section className="bg-cream py-14 sm:py-16">
        <Container className="space-y-6 sm:space-y-8">
          {aboutStories.map((story) => (
            <StoryRow key={story.title} {...story} />
          ))}
        </Container>
      </section>

      <TasteSection />
    </>
  );
}
