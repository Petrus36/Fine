import type { Metadata } from "next";
import { Photo } from "@/components/ui/Photo";
import { Container } from "@/components/ui/Container";
import { EventRow } from "@/components/events/EventRow";
import { getPublishedEvents } from "@/lib/get-events";
import { eventHero } from "@/data/events";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Akcie a podujatia",
  description:
    "Aktuálne akcie a podujatia vo Fine Bakery & Bistro. Čo u nás práve beží.",
};

export default async function AkciePage() {
  const events = await getPublishedEvents();

  return (
    <>
      <section className="relative">
        <Photo
          src={eventHero.src}
          alt={eventHero.alt}
          className="h-[320px] w-full sm:h-[380px]"
          imageClassName={eventHero.imageClassName}
          sizes="100vw"
          priority
          overlayClassName="bg-[linear-gradient(180deg,rgba(39,27,16,0.42)_0%,rgba(39,27,16,0.55)_100%)]"
        />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <h1 className="font-banner max-w-[780px] text-[32px] leading-[1.1] font-bold tracking-[0.04em] text-paper uppercase drop-shadow-[0_2px_12px_rgba(39,27,16,0.25)] sm:text-[48px]">
            {eventHero.title}
          </h1>
        </div>
      </section>

      {events.length > 0 ? (
        <section className="bg-cream py-14 sm:py-20">
          <Container className="space-y-10 sm:space-y-14">
            {events.map((event, index) => (
              <EventRow
                key={event.id}
                event={event}
                imageSide={index % 2 === 0 ? "right" : "left"}
              />
            ))}
          </Container>
        </section>
      ) : null}
    </>
  );
}
