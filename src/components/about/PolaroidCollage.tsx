import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/format";
import { aboutPolaroids } from "@/data/about";

export function PolaroidCollage() {
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-[420px] sm:h-[440px]">
      {aboutPolaroids.map((photo) => (
        <figure
          key={photo.src}
          className={cn(
            "absolute bg-paper p-2 pb-8 shadow-[0_18px_40px_-24px_rgba(39,27,16,0.45)]",
            photo.className,
          )}
        >
          <Photo
            src={photo.src}
            alt={photo.alt}
            className="aspect-[4/3] w-full"
            sizes="(max-width: 768px) 70vw, 280px"
          />
          {photo.caption ? (
            <figcaption className="absolute inset-x-2 bottom-2 text-center font-display text-[12px] italic text-espresso">
              {photo.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
