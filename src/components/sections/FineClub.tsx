import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/format";

export function FineClub({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <section className={cn("py-10", isDark ? "bg-cream" : "bg-cream-dark")}>
      <Container>
        <div
          className={cn(
            "flex flex-col items-center gap-4 rounded-[4px] px-8 py-8 text-center sm:px-12",
            isDark ? "bg-bark" : "bg-paper",
          )}
        >
          <p
            className={cn(
              "font-display text-[17px] leading-none",
              isDark ? "text-paper" : "text-ink",
            )}
          >
            Fine Club
          </p>
          <p
            className={cn(
              "max-w-[420px] text-[12px] leading-relaxed",
              isDark ? "text-paper/75" : "text-stone",
            )}
          >
            Získajte novinky, sezónne menu a zľavy priamo do e-mailu.
          </p>
          <p
            className={cn(
              "font-banner mt-1 text-[22px] font-normal tracking-[0.02em] sm:text-[26px]",
              isDark ? "text-paper/90" : "text-espresso",
            )}
          >
            Už čoskoro, pripravujeme
          </p>
        </div>
      </Container>
    </section>
  );
}
