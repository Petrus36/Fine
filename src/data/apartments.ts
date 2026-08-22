import type { Apartment, ApartmentSettings } from "@/types/apartments";

export const apartmentFallback: Apartment[] = [1, 2, 3, 4].map((number) => ({
  id: `fallback-${number}`,
  number,
  name: `Apartmán č. ${number}`,
  maxGuests: 2,
  pricePerDay: 81,
  note: "nad 30 dní cena v zmluve",
}));

export const apartmentSettingsFallback: ApartmentSettings = {
  extraPersonPerDay: 20,
  cleaningFee: 15,
  validFrom: "Platný od 1. 1. 2024",
};

export const apartmentHero = {
  src: "/images/DSC06188-2.jpg",
  alt: "Obývacia izba, kuchyňa a jedáleň v apartmáne Fine",
  eyebrow: "Ubytovanie",
  title: "Apartmány",
  subtitle:
    "Štyri zariadené apartmány priamo nad bistrom. Vlastná kuchyňa, kúpeľňa, práčka či iné vybavenie.",
};

export const apartmentGallery = [
  { src: "/images/DSC06188-2.jpg", alt: "Obývacia izba, kuchyňa a jedáleň v apartmáne Fine" },
  { src: "/images/DSC06285-2.jpg", alt: "Obývacia izba s kuchynkou v apartmáne Fine" },
  { src: "/images/DSC06304.jpg", alt: "Spálňa s balkónom v apartmáne Fine" },
  { src: "/images/DSC06319.jpg", alt: "Kúpeľňa v apartmáne Fine" },
  { src: "/images/DSC06327.jpg", alt: "Spálňa s dvoma lôžkami v apartmáne Fine" },
  { src: "/images/DSC06331.jpg", alt: "Spálňa v apartmáne Fine" },
  { src: "/images/DSC06263.jpg", alt: "Obývacia izba v apartmáne Fine" },
  { src: "/images/DSC06240.jpg", alt: "Kuchyňa v apartmáne Fine" },
  { src: "/images/DSC06209.jpg", alt: "Spálňa so skriňou v apartmáne Fine" },
  { src: "/images/DSC06191.jpg", alt: "Kúpeľňa s modrými obkladmi v apartmáne Fine" },
];

export const apartmentAmenities = {
  src: "/images/DSC06304.jpg",
  alt: "Spálňa s balkónom v apartmáne Fine",
  items: [
    { key: "kitchen", label: "Plne vybavená kuchyňa" },
    { key: "tv", label: "TV" },
    { key: "wifi", label: "WiFi" },
    { key: "klima", label: "Klíma" },
    { key: "parking", label: "Parkovanie" },
  ] as const,
};

export const apartmentIncludes = [
  "Ubytovanie pre 1 až 2 osoby",
  "Upratovanie a výmena posteľnej bielizne",
  "Výmena uterákov 2× týždenne",
];

export const apartmentStay = {
  rulesTitle: "Pravidlá a dlhodobý pobyt",
  rules: [
    "Apartmány sú nefajčiarske.",
    "Tiché hodiny platia od 22:00 do 7:00.",
    "Pobyt nad 30 dní sa dohodne individuálne v zmluve.",
  ],
  checkinTitle: "Check-in / Check-out",
  checkin: [
    "Check-in od 14:00",
    "Check-out do 10:00",
    "Kľúče si vyzdvihnete v bistro, mimo otváracích hodín podľa dohody.",
  ],
};

export const apartmentCta = {
  src: "/images/DSC06331.jpg",
  alt: "Obývacia izba apartmánu Fine",
  eyebrow: "Rezervácia",
  heading: "Máte vybraný termín?",
  subtitle: "Napíšte nám alebo zavolajte na",
};
