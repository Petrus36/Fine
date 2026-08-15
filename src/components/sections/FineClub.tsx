import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/format";

export function FineClub({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <section className={cn("py-10", isDark ? "bg-cream" : "bg-cream-dark")}>
      <Container>
        <div
          className={cn(
            "flex flex-col gap-6 rounded-[4px] px-8 py-8 sm:px-12 md:flex-row md:items-center md:justify-between",
            isDark ? "bg-bark" : "bg-paper",
          )}
        >
          <div>
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
                "mt-2.5 text-[12px]",
                isDark ? "text-paper/75" : "text-stone",
              )}
            >
              Získajte novinky, sezónne menu a zľavy priamo do e-mailu.
            </p>
          </div>
          <Button href="/fine-club" className="self-start md:self-auto">
            Pridaj sa do Fine Club
          </Button>
        </div>
      </Container>
    </section>
  );
}
