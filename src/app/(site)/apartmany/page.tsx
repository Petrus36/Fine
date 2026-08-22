import type { Metadata } from "next";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { ApartmentGallery } from "@/components/apartments/ApartmentGallery";
import { AmenitiesBand } from "@/components/apartments/AmenitiesBand";
import { PriceList } from "@/components/apartments/PriceList";
import { StayInfo } from "@/components/apartments/StayInfo";
import { ApartmentCta } from "@/components/apartments/ApartmentCta";
import { apartmentHero } from "@/data/apartments";
import { getApartmentPage } from "@/lib/get-apartments";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Apartmány",
  description:
    "Plne vybavené apartmány Fine nad bistro v Trenčíne. Cenník, vybavenie a rezervácia ubytovania.",
};

export default async function ApartmanyPage() {
  const { apartments, settings } = await getApartmentPage();

  return (
    <>
      <section className="relative">
        <Photo
          src={apartmentHero.src}
          alt={apartmentHero.alt}
          className="h-[440px] w-full sm:h-[560px]"
          sizes="100vw"
          priority
          overlayClassName="bg-[linear-gradient(180deg,rgba(39,27,16,0.62)_0%,rgba(39,27,16,0.8)_100%)]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="font-body text-[12px] font-[500] tracking-[0.2em] text-[#D4835A] uppercase sm:text-[13px]">
            {apartmentHero.eyebrow}
          </p>
          <h1 className="font-banner mt-3 text-[40px] leading-none font-bold tracking-[0.04em] text-paper uppercase drop-shadow-[0_2px_12px_rgba(39,27,16,0.25)] sm:text-[64px]">
            {apartmentHero.title}
          </h1>
          <p className="font-body mt-5 max-w-[540px] text-[15px] leading-relaxed font-normal text-paper/90 sm:text-[17px]">
            {apartmentHero.subtitle}
          </p>
          <Button href={site.reservationUrl} className="mt-6">
            Rezervovať
          </Button>
        </div>
      </section>

      <ApartmentGallery />
      <AmenitiesBand />
      <PriceList apartments={apartments} settings={settings} />
      <StayInfo />
      <ApartmentCta />
    </>
  );
}
