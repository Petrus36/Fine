import { Container } from "@/components/ui/Container";
import { formatAllergens, formatPrice } from "@/lib/format";
import {
  COURSE_LABELS,
  COURSE_ORDER,
  WEEKDAY_LABELS,
  type DailyMenu,
} from "@/types/menu";

export function DailyMenuList({ menus }: { menus: DailyMenu[] }) {
  return (
    <Container className="pt-14 pb-16">
      <div className="space-y-14">
        {menus
          .filter((menu) => menu.items.length > 0)
          .map((menu) => {
          const items = [...menu.items].sort(
            (a, b) => COURSE_ORDER.indexOf(a.course) - COURSE_ORDER.indexOf(b.course),
          );

          return (
            <section key={menu.id}>
              <h2 className="font-display text-[26px] leading-none font-normal text-ink">
                {WEEKDAY_LABELS[menu.weekday]}
              </h2>
              <div className="mt-5 border-t border-hairline" />

              <ul className="mt-6 space-y-6">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-6"
                  >
                    <div className="max-w-[820px]">
                      <p className="text-[10px] font-bold tracking-[0.06em] text-ink">
                        {COURSE_LABELS[item.course]}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-stone">
                        {item.name}{" "}
                        <span className="text-stone/80">
                          {formatAllergens(item.allergens)}
                        </span>
                      </p>
                    </div>
                    {item.price !== null ? (
                      <p className="shrink-0 pt-0.5 text-[12px] font-medium text-ink tabular-nums">
                        {formatPrice(item.price)}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
