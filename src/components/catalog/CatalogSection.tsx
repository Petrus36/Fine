import type { CatalogImageSlot, CatalogItem, CatalogSectionDef } from "@/types/catalog";
import { Photo } from "@/components/ui/Photo";
import { CatalogItemList } from "./CatalogItemList";
import { MenuCard } from "./MenuCard";
import { cn } from "@/lib/format";

function Frame({
  image,
  sizes = "(max-width: 768px) 100vw, 46vw",
}: {
  image: CatalogImageSlot;
  sizes?: string;
}) {
  return (
    <Photo
      src={image.src}
      alt={image.alt}
      className={image.className}
      imageClassName={image.imageClassName}
      sizes={sizes}
    />
  );
}

function ImageColumn({
  image,
  gallery,
}: {
  image: CatalogImageSlot;
  gallery?: CatalogImageSlot[];
}) {
  return (
    <div className="space-y-4">
      <Frame image={image} />
      {gallery && gallery.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {gallery.map((slot) => (
            <Frame
              key={slot.src}
              image={slot}
              sizes="(max-width: 768px) 45vw, 22vw"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CatalogSection({
  section,
  items,
}: {
  section: CatalogSectionDef;
  items: CatalogItem[];
}) {
  const { layout } = section;

  if (layout.kind === "card") {
    return (
      <div className={layout.className}>
        <MenuCard title={section.title} intro={section.intro} items={items} />
      </div>
    );
  }

  if (layout.kind === "numbered-split") {
    const imageFirst = layout.imageSide === "left";
    return (
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn(imageFirst ? "lg:order-1" : "lg:order-2")}>
          <ImageColumn image={layout.image} gallery={layout.gallery} />
        </div>
        <div className={cn(imageFirst ? "lg:order-2" : "lg:order-1")}>
          <p className="text-[12px] font-medium tracking-[0.08em] text-clay">{layout.number}</p>
          <h2 className="mt-1 font-display text-[32px] leading-none font-normal text-espresso">
            {section.title}
          </h2>
          {section.intro ? (
            <p className="mt-4 max-w-[46ch] text-[12px] leading-relaxed text-stone">{section.intro}</p>
          ) : null}
          <div className="mt-7">
            <CatalogItemList items={items} compact />
          </div>
        </div>
      </div>
    );
  }

  const imageFirst = layout.imageSide === "left";
  return (
    <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
      <div className={cn(imageFirst ? "lg:order-1" : "lg:order-2")}>
        <Frame image={layout.image} />
      </div>
      <div className={cn(imageFirst ? "lg:order-2" : "lg:order-1")}>
        <MenuCard title={section.title} intro={section.intro} items={items} />
      </div>
    </div>
  );
}
