export const site = {
  name: "Fine Bakery & Bistro",
  legalName: "FINE s.r.o.",
  addressStreet: "Generála M. R. Štefánika 1429",
  addressCity: "901 01 Malacky",
  address: "Generála M. R. Štefánika 1429, 901 01 Malacky",
  ico: "45860114",
  dic: "2023121749",
  phone: "+421 917 917 916",
  email: "fine@finerestaurant.sk",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  orderUrl: "https://gastro.finerestaurant.sk/sk/",
  reservationUrl:
    "https://www.secure-hotel-booking.com/d-edge/FINE-Restaurant-Apartments/2564/sk/DateSelection?invalidateEngineCache=true",
} as const;

export const mainNav = [
  { label: "Domov", href: "/" },
  { label: "Bakery & Bistro", href: "/bakery-bistro" },
  { label: "O nás", href: "/o-nas" },
] as const;

export const secondaryNav = [
  { label: "Apartmány", href: "/apartmany" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const openingHours = [
  { days: "Pondelok", hours: "Zatvorené" },
  { days: "Utorok - Sobota", hours: "7:00-15:00" },
  { days: "Nedeľa", hours: "Zatvorené" },
] as const;

export const footerLinks = [
  { label: "Domov", href: "/" },
  { label: "Bakery & Bistro", href: "/bakery-bistro" },
  { label: "Apartmány", href: "/apartmany" },
  { label: "O nás", href: "/o-nas" },
  { label: "Fine Club", href: "/fine-club" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Alergény", href: "/menu#alergeny" },
] as const;

export const highlights = [
  {
    icon: "clock" as const,
    label: "Otvorené",
    value: "Ut – So · 7:00 – 15:00",
  },
  {
    icon: "cloche" as const,
    label: "Obedové menu",
    value: "od 11:00 do vypredania",
  },
  {
    icon: "bed" as const,
    label: "Ubytovanie",
    value: "Apartmány nad podnikom",
  },
  {
    icon: "phone" as const,
    label: "Kontakt a rezervácie",
    value: site.phone,
  },
];
