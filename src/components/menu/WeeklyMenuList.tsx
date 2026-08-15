import { Container } from "@/components/ui/Container";
import { formatAllergens, formatPrice } from "@/lib/format";
import type { WeeklyDish } from "@/types/menu";

export function WeeklyMenuList({ dishes }: { dishes: WeeklyDish[] }) {
  return (
    <Container className="pt-10 pb-16">
      <div className="space-y-5">
        {dishes.map((dish) => (
          <article
            key={dish.id}
            className="rounded-[6px] bg-paper px-7 py-7 sm:px-9"
          >
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="font-display text-[22px] leading-none font-normal text-ink">
                {dish.name}
              </h2>
              <p className="font-display shrink-0 text-[15px] text-ink tabular-nums">
                {formatPrice(dish.price)}
              </p>
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-stone">
              {dish.description}{" "}
              <span className="text-stone/80">{formatAllergens(dish.allergens)}</span>
            </p>

            <p className="mt-5 text-[9px] font-semibold tracking-[0.2em] text-rust uppercase">
              Na výber
            </p>

            <ul className="mt-3 flex flex-wrap gap-2.5">
              {dish.options.map((option) => (
                <li
                  key={option}
                  className="rounded-full border border-hairline px-4 py-2 text-[11px] text-stone"
                >
                  {option}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Container>
  );
}
