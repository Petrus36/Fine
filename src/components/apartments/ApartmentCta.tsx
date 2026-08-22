import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { apartmentCta } from "@/data/apartments";
import { site } from "@/data/site";

export function ApartmentCta() {
  return (
    <section className="relative">
      <Photo
        src={apartmentCta.src}
        alt={apartmentCta.alt}
        className="h-[310px] w-full sm:h-[380px]"
        sizes="100vw"
        overlayClassName="bg-[linear-gradient(180deg,rgba(39,27,16,0.45)_0%,rgba(39,27,16,0.58)_100%)]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="font-body text-[13px] leading-none font-[500] tracking-[1.4px] text-[#D4835A] uppercase">
          {apartmentCta.eyebrow}
        </p>
        <h2 className="font-banner mt-3 text-[32px] font-normal text-paper sm:text-[40px]">
          {apartmentCta.heading}
        </h2>
        <p className="font-body mt-4 text-[14px] font-normal text-paper/90 sm:text-[15px]">
          {apartmentCta.subtitle}{" "}
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="underline decoration-paper/40">
            {site.phone}
          </a>
          .
        </p>
        <Button href={site.reservationUrl} className="mt-6">
          Rezervovať
        </Button>
      </div>
    </section>
  );
}
