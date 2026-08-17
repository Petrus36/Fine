import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export function CatalogCta({ heading }: { heading?: string }) {
  return (
    <section className="px-5 py-12 text-center sm:px-8">
      {heading ? (
        <p className="font-display text-[22px] uppercase tracking-[0.12em] text-espresso">
          {heading}
        </p>
      ) : null}
      <Button href={site.orderUrl} className={heading ? "mt-6" : undefined}>
        Objednať online
      </Button>
      <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-stone">
        alebo telefonicky: {site.phone}
      </p>
    </section>
  );
}
