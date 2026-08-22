export type CatalogPageKey = "PECIVO" | "A_LA_CARTE" | "RANAJKY" | "NAPOJE";

export interface CatalogItem {
  id: string;
  page: CatalogPageKey;
  section: string;
  category: string | null;
  name: string;
  description: string | null;
  allergens: number[];
  portion: string | null;
  price: number;
  priceAlt: number | null;
  position: number;
}

export interface CatalogImageSlot {
  src: string;
  alt: string;
  /** Tailwind classes for the photo frame. */
  className: string;
  /** Tailwind classes for the image crop inside the frame. */
  imageClassName?: string;
}

export type CatalogSectionLayout =
  | {
      kind: "numbered-split";
      number: string;
      imageSide: "left" | "right";
      image: CatalogImageSlot;
    }
  | {
      kind: "card-split";
      imageSide: "left" | "right";
      image: CatalogImageSlot;
    }
  | {
      kind: "card";
      /** Width and alignment of a card with no photo. */
      className: string;
    };

export interface CatalogSectionDef {
  key: string;
  title: string;
  intro?: string;
  layout: CatalogSectionLayout;
}

export interface CatalogPageDef {
  key: CatalogPageKey;
  slug: string;
  navLabel: string;
  title: string;
  subtitle: string;
  description: string;
  hero: CatalogImageSlot;
  eyebrow?: string;
  hoursNote?: string;
  ctaHeading?: string;
  showHeroOrder?: boolean;
  showOrderCta?: boolean;
  sections: CatalogSectionDef[];
}
