import { CatalogHero } from "./CatalogHero";
import { CatalogSection } from "./CatalogSection";
import { CatalogCta } from "./CatalogCta";
import { Allergens } from "@/components/menu/Allergens";
import { Container } from "@/components/ui/Container";
import type { CatalogItem, CatalogPageDef } from "@/types/catalog";
import type { Allergen } from "@/types/menu";

export function CatalogPageView({
  page,
  items,
  allergens,
}: {
  page: CatalogPageDef;
  items: CatalogItem[];
  allergens: Allergen[];
}) {
  return (
    <>
      <CatalogHero
        title={page.title}
        subtitle={page.subtitle}
        eyebrow={page.eyebrow}
        imageSrc={page.hero.src}
        imageAlt={page.hero.alt}
        imageClassName={page.hero.className}
        cropClassName={page.hero.imageClassName}
        showOrder={page.showHeroOrder ?? true}
      />

      {page.hoursNote ? (
        <p className="bg-cream px-5 py-6 text-center text-[13px] font-medium text-clay">
          {page.hoursNote}
        </p>
      ) : null}

      <section className="bg-cream py-14 sm:py-16">
        <Container className="space-y-16 sm:space-y-20">
          {page.sections.map((section) => (
            <CatalogSection
              key={section.key}
              section={section}
              items={items.filter((item) => item.section === section.key)}
            />
          ))}
        </Container>
      </section>

      <CatalogCta heading={page.ctaHeading} />
      <Allergens items={allergens} />
    </>
  );
}
