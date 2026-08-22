import { Photo } from "@/components/ui/Photo";
import { apartmentAmenities } from "@/data/apartments";

function Icon({ name }: { name: string }) {
  const common = "h-6 w-6 stroke-current";

  switch (name) {
    case "kitchen":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <rect x="4" y="5" width="16" height="14" rx="1.5" strokeWidth="1.5" />
          <circle cx="8" cy="10" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="10" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="16" cy="10" r="1.2" fill="currentColor" stroke="none" />
          <path d="M6 17h12" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "tv":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <rect x="3.5" y="6" width="17" height="11.5" rx="1.4" strokeWidth="1.5" />
          <path d="M8 20h8M12 17.5V20" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "wifi":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M5 12.5c4-4 10-4 14 0" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 15.2c2.4-2.2 5.6-2.2 8 0" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="18" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "klima":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <rect x="4" y="6" width="16" height="10" rx="1.5" strokeWidth="1.5" />
          <path d="M7 10h10M7 13h10M7 16h10" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "parking":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <circle cx="12" cy="12" r="8.2" strokeWidth="1.5" />
          <path
            d="M10 16V8h3.2a2.6 2.6 0 0 1 0 5.2H10"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <circle cx="12" cy="12" r="8.2" strokeWidth="1.5" />
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
        className="h-[320px] w-full sm:h-[400px]"
        sizes="100vw"
        overlayClassName="bg-[#291A0E]/76"
        imageClassName="object-center"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-10 text-center">
        <h2 className="font-banner text-[34px] font-normal tracking-[0.08em] text-paper uppercase sm:text-[42px]">
          Vybavenie
        </h2>
        <ul className="mt-10 flex flex-wrap items-start justify-center gap-x-10 gap-y-8 sm:gap-x-14 lg:gap-x-20">
          {apartmentAmenities.items.map((item) => (
            <li
              key={item.key}
              className="flex max-w-[120px] flex-col items-center gap-3 sm:max-w-[140px]"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-paper text-[#D4835A]">
                <Icon name={item.key} />
              </span>
              <span className="font-body text-[11px] font-normal leading-snug text-paper sm:text-[12px]">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
