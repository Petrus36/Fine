import Image from "next/image";
import { cn } from "@/lib/format";
import type { EventItem } from "@/types/events";

export function EventRow({
  event,
  imageSide,
}: {
  event: EventItem;
  imageSide: "left" | "right";
}) {
  const imageFirst = imageSide === "left";

  return (
    <article className="grid items-center lg:grid-cols-2">
      <div
        className={cn(
          "relative z-10 rounded-[10px] bg-paper px-8 py-10 sm:px-12 sm:py-12",
          imageFirst ? "lg:order-2 lg:-ml-12" : "lg:order-1 lg:-mr-12",
        )}
      >
        <h2 className="font-banner text-[26px] leading-tight font-normal text-espresso sm:text-[32px]">
          {event.title}
        </h2>
        <p className="font-body mt-4 max-w-[48ch] text-[14px] leading-[1.85] font-normal text-stone whitespace-pre-line">
          {event.body}
        </p>
      </div>

      <div
        className={cn(
          "relative mt-4 h-[240px] overflow-hidden rounded-[10px] sm:h-[300px] lg:mt-0 lg:h-[340px]",
          imageFirst ? "lg:order-1" : "lg:order-2",
        )}
      >
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center border border-dashed border-clay/40 bg-cream-dark/50">
            <span className="px-4 text-center text-[11px] font-medium tracking-[0.12em] text-clay/70 uppercase">
              fotka akcie
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
