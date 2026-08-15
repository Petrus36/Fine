import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { priceToInput } from "@/lib/admin-parse";
import { deleteDish, saveDish } from "./actions";
import { DishCard, type DishValues } from "@/components/admin/DishCard";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { dangerButtonClass } from "@/components/admin/styles";

export const dynamic = "force-dynamic";

const emptyDish: DishValues = {
  id: "",
  name: "",
  description: "",
  allergens: "",
  price: "",
  options: "",
  position: 0,
  active: true,
};

export default async function WeeklyMenuPage() {
  await requireAdmin();

  const rows = await getPrisma().weeklyDish.findMany({
    orderBy: [{ position: "asc" }, { createdAt: "asc" }],
    include: { options: { orderBy: { position: "asc" } } },
  });

  const dishes: DishValues[] = rows.map((dish) => ({
    id: dish.id,
    name: dish.name,
    description: dish.description,
    allergens: dish.allergens.join(","),
    price: priceToInput(dish.price),
    options: dish.options.map((option) => option.label).join(", "),
    position: dish.position,
    active: dish.active,
  }));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-[26px] text-espresso">Týždenné menu</h1>
        <p className="mt-1 max-w-[62ch] text-[13px] leading-relaxed text-stone">
          Jedlá, ktoré sú v ponuke celý týždeň. Zobrazia sa na webe v záložke
          „Týždenné menu“.
        </p>
      </header>

      <section className="space-y-4">
        {dishes.length === 0 ? (
          <p className="text-[13px] text-stone">Zatiaľ tu nie je žiadne jedlo.</p>
        ) : (
          dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              action={saveDish}
              submitLabel="Uložiť zmeny"
              footer={
                <ConfirmSubmit
                  className={dangerButtonClass}
                  formAction={deleteDish}
                  message={`Naozaj vymazať jedlo „${dish.name}“?`}
                >
                  Vymazať
                </ConfirmSubmit>
              }
            />
          ))
        )}
      </section>

      <section>
        <h2 className="mb-4 font-display text-[17px] text-espresso">Pridať jedlo</h2>
        <DishCard
          dish={{ ...emptyDish, position: dishes.length }}
          action={saveDish}
          submitLabel="Pridať jedlo"
        />
      </section>
    </div>
  );
}
