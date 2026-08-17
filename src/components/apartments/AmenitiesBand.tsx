import { Photo } from "@/components/ui/Photo";
import { apartmentAmenities } from "@/data/apartments";

function Icon({ name }: { name: string }) {
  const common = "h-6 w-6 stroke-espresso";

  switch (name) {
    case "wifi":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M5 12.5c4-4 10-4 14 0" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 15.2c2.4-2.2 5.6-2.2 8 0" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="18" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tv":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <rect x="3.5" y="6" width="17" height="11.5" rx="1.4" strokeWidth="1.5" />
          <path d="M8 20h8M12 17.5V20" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "parking":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <circle cx="12" cy="12" r="8.2" strokeWidth="1.5" />
          <path d="M10 16V8h3.2a2.6 2.6 0 0 1 0 5.2H10" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "kitchen":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path
            d="M7 20V9.5M7 9.5c0-2 .8-3.5 2.2-4.5M17 20V4.5c-2.4 1.4-3.4 3.4-3.4 6.2V11H17"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <rect x="5" y="4.5" width="14" height="15" rx="1.4" strokeWidth="1.5" />
          <path d="M8 8.5h8M8 12h5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

export function AmenitiesBand() {
  return (
    <section className="relative">
      <Photo
        src={apartmentAmenities.src}
        alt={apartmentAmenities.alt}
        className="h-[290px] w-full sm:h-[350px]"
        sizes="100vw"
        overlayClassName="bg-[linear-gradient(180deg,rgba(39,27,16,0.42)_0%,rgba(39,27,16,0.55)_100%)]"
        imageClassName="object-center"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="font-banner text-[34px] font-normal tracking-[0.08em] text-paper uppercase sm:text-[42px]">
          Vybavenie
        </h2>
        <ul className="mt-8 flex flex-wrap items-start justify-center gap-12 sm:gap-20 lg:gap-28">
          {apartmentAmenities.items.map((item) => (
            <li key={item.key} className="flex w-[72px] flex-col items-center gap-2">
              <span className="flex size-12 items-center justify-center rounded-full bg-paper/95">
                <Icon name={item.key} />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-paper">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
