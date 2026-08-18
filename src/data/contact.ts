import { site } from "@/data/site";

export const contactOpeningHours = [
  { day: "pondelok", hours: "zatvorené" },
  { day: "utorok", hours: "7:00-15:00" },
  { day: "streda", hours: "7:00-15:00" },
  { day: "štvrtok", hours: "7:00-15:00" },
  { day: "piatok", hours: "7:00-15:00" },
  { day: "sobota", hours: "7:00-15:00" },
  { day: "nedeľa", hours: "zatvorené" },
] as const;

export const contactHero = {
  src: "/images/IMG_1581.JPG",
  alt: "Interiér Fine Bakery & Bistro",
  title: "Kontakt",
  imageClassName: "object-[center_22%]",
};

export const contactMap = {
  title: "FINE restaurant & apartmens",
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2654.4!2d17.0192264!3d48.4312468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476cc20fd76782f3%3A0xf5eeed81dfa211a1!2sFINE%20restaurant%20%26%20apartmens!5e0!3m2!1ssk!2ssk!4v0!5m2!1ssk!2ssk",
  placeUrl:
    "https://www.google.com/maps/place/FINE+restaurant+%26+apartmens/@48.4312468,17.0192264,17z/data=!4m6!3m5!1s0x476cc20fd76782f3:0xf5eeed81dfa211a1!8m2!3d48.4312468!4d17.0192264!16s%2Fg%2F1ptzgrdkp",
};

export const contactCards = [
  {
    key: "address",
    title: "Adresa",
    lines: [
      site.legalName,
      site.addressStreet,
      site.addressCity,
      `IČO ${site.ico}`,
      `DIČ ${site.dic}`,
    ],
  },
  {
    key: "contact",
    title: "Kontakt",
    lines: [
      `Manažér: ${site.managerPhone}`,
      `Ubytovanie: ${site.phone}`,
      site.email,
    ],
  },
  {
    key: "hours",
    title: "Otváracie hodiny",
    hours: contactOpeningHours,
  },
] as const;
