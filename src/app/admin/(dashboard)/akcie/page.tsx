import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { deleteEvent, saveEvent } from "./actions";
import { EventCard, type EventValues } from "@/components/admin/EventCard";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { dangerButtonClass } from "@/components/admin/styles";

export const dynamic = "force-dynamic";

const emptyEvent: EventValues = {
  id: "",
  title: "",
  body: "",
  imageUrl: null,
  position: 0,
  active: true,
};

export default async function EventsAdminPage() {
  await requireAdmin();

  let events: EventValues[] = [];
  try {
    const rows = await getPrisma().event.findMany({
      orderBy: [{ position: "asc" }, { createdAt: "desc" }],
    });
    events = rows.map((event) => ({
      id: event.id,
      title: event.title,
      body: event.body,
      imageUrl: event.imageUrl,
      position: event.position,
      active: event.active,
    }));
  } catch (error) {
    console.error("Could not load events.", error);
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-[26px] text-espresso">Akcie</h1>
        <p className="mt-1 max-w-[62ch] text-[13px] leading-relaxed text-stone">
          Akcie a podujatia na stránke /akcie. Neaktívne položky na webe neuvidíte —
          ak nie je žiadna zapnutá, sekcia sa skryje.
        </p>
      </header>

      <section className="space-y-4">
        {events.length === 0 ? (
          <p className="text-[13px] text-stone">Zatiaľ tu nie je žiadna akcia.</p>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              action={saveEvent}
              submitLabel="Uložiť zmeny"
              footer={
                <ConfirmSubmit
                  className={dangerButtonClass}
                  formAction={deleteEvent}
                  message={`Naozaj vymazať akciu „${event.title}“?`}
                >
                  Vymazať
                </ConfirmSubmit>
              }
            />
          ))
        )}
      </section>

      <section>
        <h2 className="mb-4 font-display text-[17px] text-espresso">Pridať akciu</h2>
        <EventCard
          event={{ ...emptyEvent, position: events.length }}
          action={saveEvent}
          submitLabel="Pridať akciu"
        />
      </section>
    </div>
  );
}
