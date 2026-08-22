import type { CatalogPageDef, CatalogPageKey } from "@/types/catalog";

const heroPhoto = (
  src: string,
  alt: string,
  imageClassName?: string,
  className = "h-[360px] w-full sm:h-[420px]",
): CatalogPageDef["hero"] => ({
  src,
  alt,
  className,
  ...(imageClassName ? { imageClassName } : {}),
});

const portrait = (src: string, alt: string, tall = false) => ({
  src,
  alt,
  className: tall
    ? "h-[460px] w-full rounded-[10px] sm:h-[560px]"
    : "h-[380px] w-full rounded-[10px] sm:h-[460px]",
});

const landscape = (src: string, alt: string, imageClassName?: string) => ({
  src,
  alt,
  className: "h-[280px] w-full rounded-[10px] sm:h-[320px]",
  ...(imageClassName ? { imageClassName } : {}),
});

const pecivoBreadImage =
  "/images/hf_20260810_121215_ea2f305d-93dd-429a-80e6-52a759941a47 (1).png";

const ranajkyImage = "/images/ranajky (1).png";

export const catalogPages: Record<CatalogPageKey, CatalogPageDef> = {
  PECIVO: {
    key: "PECIVO",
    slug: "pecivo",
    navLabel: "Pečivo a chlieb",
    title: "Pečivo a chlieb",
    subtitle:
      "Každé ráno vám prinášame čerstvé pečivo a chlieb z tradície, s odvahou rásť vo chuti.",
    description: "Remeselný chlieb, sladké a slané pečivo pečené každé ráno.",
    hero: heroPhoto(pecivoBreadImage, "Čerstvé pečivo a chlieb Fine"),
    ctaHeading: "Čerstvé pečivo",
    sections: [
      {
        key: "chlieb",
        title: "Chlieb",
        intro:
          "Chlieb si pečieme sami. Cesto odpočíva celú noc a do pece ide ráno.",
        layout: {
          kind: "numbered-split",
          number: "01",
          imageSide: "left",
          image: portrait(pecivoBreadImage, "Bochníky chleba"),
        },
      },
      {
        key: "sladke",
        title: "Sladké pečivo",
        intro:
          "Maslo, veľa masla. Cesto na croissanty ukladáme ručne a necháme ho oddýchnuť.",
        layout: {
          kind: "numbered-split",
          number: "02",
          imageSide: "right",
          image: portrait("/images/pecivo-sladke.jpg", "Sladké pečivo a croissanty"),
        },
      },
      {
        key: "slane",
        title: "Slané pečivo",
        intro: "Čerstvo pečené slané pečivo, quiche a chrumkavé drobnosti.",
        layout: {
          kind: "numbered-split",
          number: "03",
          imageSide: "left",
          image: portrait("/images/pecivo-slane.jpg", "Slané pečivo na tanieri"),
        },
      },
    ],
  },

  A_LA_CARTE: {
    key: "A_LA_CARTE",
    slug: "a-la-carte",
    navLabel: "Tradičné jedlá",
    title: "Naše tradičné FINE jedlá",
    subtitle: "Tradičné Fine klasiky, ktoré u nás nájdete po celý rok.",
    description: "Polievky, predjedlá, šaláty a hlavné jedlá Fine klasiky.",
    hero: heroPhoto(
      "/images/fine-header-jedlo-stol.jpg",
      "Tradičné Fine jedlá",
      "object-center",
      "h-[400px] w-full sm:h-[460px]",
    ),
    sections: [
      {
        key: "polievka",
        title: "Polievka",
        layout: {
          kind: "card-split",
          imageSide: "right",
          image: landscape("/images/images.jpeg", "Polievka"),
        },
      },
      {
        key: "predjedla",
        title: "Predjedlá",
        layout: {
          kind: "card-split",
          imageSide: "left",
          image: landscape("/images/IMG_1595.jpg", "Predjedlá"),
        },
      },
      {
        key: "salaty",
        title: "Šaláty",
        layout: {
          kind: "card-split",
          imageSide: "right",
          image: {
            src: "/images/nF19701uR-Se9P2bCg91LA.jpg",
            alt: "Šalát",
            className: "h-[380px] w-full rounded-[10px] sm:h-[460px]",
          },
        },
      },
      {
        key: "hlavne",
        title: "Hlavné jedlá",
        layout: {
          kind: "card-split",
          imageSide: "left",
          image: landscape(
            "/images/hf_20260808_115437_902a5753-bbcd-40d9-8b9d-b504b06c4e9e.png",
            "Hlavné jedlo",
          ),
        },
      },
      {
        key: "prilohy",
        title: "Prílohy",
        layout: { kind: "card", className: "max-w-[820px] mr-auto" },
      },
      {
        key: "omacky",
        title: "Omáčky",
        layout: { kind: "card", className: "max-w-[520px] ml-auto" },
      },
      {
        key: "dezerty",
        title: "Dezerty",
        layout: { kind: "card", className: "max-w-[480px] mr-auto" },
      },
    ],
  },

  RANAJKY: {
    key: "RANAJKY",
    slug: "ranajky",
    navLabel: "Raňajky",
    title: "Raňajkové menu",
    subtitle: "Začíname deň sladkým aj slaným — od 7:00 do 11:00.",
    description: "Sladké a slané raňajky a plnené bagety od 7:00 do 11:00.",
    hero: heroPhoto(ranajkyImage, "Raňajky Fine Bakery & Bistro"),
    hoursNote: "Podávame v čase od 7:00 do 11:00 hod.",
    sections: [
      {
        key: "sladke",
        title: "Sladké raňajky",
        layout: {
          kind: "card-split",
          imageSide: "right",
          image: portrait(ranajkyImage, "Sladké raňajky", true),
        },
      },
      {
        key: "bagety",
        title: "Plnené bagety",
        layout: {
          kind: "card-split",
          imageSide: "left",
          image: portrait("/images/bageta.jpeg", "Plnená bageta"),
        },
      },
      {
        key: "slane",
        title: "Slané raňajky",
        layout: {
          kind: "card-split",
          imageSide: "right",
          image: portrait("/images/prosciutto croissant (6).jpeg", "Slané raňajky", true),
        },
      },
    ],
  },

  NAPOJE: {
    key: "NAPOJE",
    slug: "napoje",
    navLabel: "Nápojový lístok",
    title: "Nápojový lístok",
    subtitle: "Kvalitná káva, čaj a limonády",
    description: "Káva, matcha, limonády, vína a miešané drinky.",
    hero: heroPhoto("/images/IMG_1581.JPG", "Nápojový lístok Fine", "object-[center_22%]"),
    eyebrow: "Kvalitná káva, čaj a limonády",
    showHeroOrder: false,
    showOrderCta: false,
    sections: [
      {
        key: "kava",
        title: "Káva",
        layout: {
          kind: "card-split",
          imageSide: "right",
          image: portrait("/images/ako_pripravit_espresso-scaled.jpg", "Káva"),
        },
      },
      {
        key: "kava-special",
        title: "Kávové špeciality",
        layout: { kind: "card", className: "mx-auto max-w-[640px]" },
      },
      {
        key: "matcha",
        title: "Matcha",
        layout: {
          kind: "card-split",
          imageSide: "right",
          image: landscape("/images/mango, strawberry matcha (1).PNG", "Matcha", "object-[center_65%]"),
        },
      },
      {
        key: "limonady",
        title: "Limonády",
        layout: {
          kind: "card-split",
          imageSide: "left",
          image: landscape("/images/limonady-5.jpg", "Limonády", "object-[center_70%]"),
        },
      },
      {
        key: "caje",
        title: "Čaje",
        layout: {
          kind: "card-split",
          imageSide: "right",
          image: landscape("/images/bylinkovy-caj-domaci.jpg", "Čaj"),
        },
      },
      {
        key: "nealko",
        title: "Nealko nápoje",
        layout: {
          kind: "card-split",
          imageSide: "left",
          image: portrait("/images/club-soda-sparkling-water.webp", "Nealko nápoje", true),
        },
      },
      {
        key: "drinky",
        title: "Miešané drinky",
        layout: {
          kind: "card-split",
          imageSide: "right",
          image: portrait("/images/miešané drinky (3).jpeg", "Miešané drinky"),
        },
      },
      {
        key: "pivo",
        title: "Pivo",
        layout: {
          kind: "card-split",
          imageSide: "left",
          image: portrait("/images/Pilsner-Urquell_11zon-scaled.webp", "Pivo"),
        },
      },
      {
        key: "vina",
        title: "Vína & Prosecco",
        layout: {
          kind: "card-split",
          imageSide: "right",
          image: portrait("/images/sekt.jpg", "Víno"),
        },
      },
      {
        key: "destilaty",
        title: "Destiláty",
        intro: "0,04 l",
        layout: {
          kind: "card-split",
          imageSide: "left",
          image: portrait("/images/whiskey.png", "Destiláty"),
        },
      },
    ],
  },
};

export const catalogPageList = Object.values(catalogPages);

export function catalogBySlug(slug: string): CatalogPageDef | undefined {
  return catalogPageList.find((page) => page.slug === slug);
}

export function isCatalogPageKey(value: string): value is CatalogPageKey {
  return value in catalogPages;
}
