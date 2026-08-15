import { Container } from "@/components/ui/Container";
import type { Allergen } from "@/types/menu";

export function Allergens({ items }: { items: Allergen[] }) {
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <Container className="pb-14">
      <div id="alergeny" className="rounded-[6px] bg-paper px-8 py-9 sm:px-10">
        <h2 className="font-display text-[20px] leading-none font-normal text-ink">
          Alergény
        </h2>

        <div className="mt-6 grid gap-x-12 gap-y-3 md:grid-cols-2">
          {columns.map((column, index) => (
            <ul key={index} className="space-y-3">
              {column.map((allergen) => (
                <li
                  key={allergen.number}
                  className="text-[10px] leading-relaxed text-stone"
                >
                  <span className="text-ink">{allergen.number}</span> {allergen.label}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Container>
  );
}
