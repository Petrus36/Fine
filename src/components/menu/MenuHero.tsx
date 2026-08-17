import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/data/site";

export function MenuHero() {
  return (
    <section className="relative">
      <Photo
        src="/images/fine-header-jedlo-stol.jpg"
        alt="Prestretý stôl s jedlom Fine Bakery & Bistro"
        className="h-[280px] w-full sm:h-[340px]"
        sizes="100vw"
        priority
        overlayClassName="bg-espresso/45"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-[42px] leading-none font-normal text-paper sm:text-[52px]">
          Menu
        </h1>
        <p className="mt-4 max-w-[560px] text-[12px] leading-relaxed text-paper/85">
          Denné menu varíme od utorka do piatka. Týždenné jedlá sú v ponuke celý týždeň.
        </p>
        <Button href={site.orderUrl} className="mt-6">
          Objednať online
        </Button>
      </div>
    </section>
  );
}
