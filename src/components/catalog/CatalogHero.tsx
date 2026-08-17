import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { cn } from "@/lib/format";

export function CatalogHero({
  title,
  subtitle,
  eyebrow,
  imageSrc,
  imageAlt,
  imageClassName,
  cropClassName,
  showOrder = true,
}: {
  title: string;
  subtitle: string;
  eyebrow?: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName: string;
  cropClassName?: string;
  showOrder?: boolean;
}) {
  return (
    <section className="relative">
      <Photo
        src={imageSrc}
        alt={imageAlt}
        className={imageClassName}
        imageClassName={cropClassName}
        sizes="100vw"
        priority
        overlayClassName="bg-[linear-gradient(180deg,rgba(39,27,16,0.38)_0%,rgba(39,27,16,0.58)_100%)]"
      />
      <div className="absolute inset-0 flex w-full flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto flex w-full max-w-[720px] flex-col items-center">
          <h1 className="font-banner text-center text-[34px] leading-[1.1] font-normal text-paper drop-shadow-[0_2px_12px_rgba(39,27,16,0.25)] sm:text-[48px]">
            {title}
          </h1>
          {eyebrow ? (
            <p className="mt-4 text-center text-[10px] font-semibold tracking-[0.22em] text-paper/90 uppercase">
              {eyebrow}
            </p>
          ) : (
            <p className="font-body mt-4 max-w-[520px] text-center text-[12px] leading-relaxed font-normal text-paper/90 sm:text-[13px]">
              {subtitle}
            </p>
          )}
          {showOrder ? (
            <>
              <Button href={site.orderUrl} className="mt-6">
                Objednať online
              </Button>
              <p className={cn("mt-3 text-center text-[11px] text-paper/80")}>
                alebo telefonicky: {site.phone}
              </p>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
