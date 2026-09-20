import { site } from "@/data/site";

export const cookiePage = {
  title: "Súbory cookie",
  eyebrow: "Informácie",
  intro:
    "Používame len nevyhnutné súbory cookie, aby web fungoval a aby sme si zapamätali váš výber. Analytiku ani reklamné pixely na stránke nemáme. Voliteľné sú len súbory cookie, ktoré môže nastaviť Google pri zobrazení mapy na stránke Kontakt.",
} as const;

export const cookieCategories = [
  {
    key: "necessary" as const,
    title: "Nevyhnutné",
    required: true,
    summary: "Potrebné na beh webu a zapamätanie vášho výberu. Bez nich stránka nevie uložiť súhlas.",
    cookies: [
      {
        name: "fine_cookie_consent",
        purpose: "Ukladá, či ste prijali alebo odmietli voliteľné súbory cookie.",
        duration: "12 mesiacov",
        provider: site.legalName,
      },
      {
        name: "fine_admin_session",
        purpose: "Prihlásenie do administrácie. Vytvorí sa až po prihlásení na /admin.",
        duration: "7 dní",
        provider: site.legalName,
      },
    ],
  },
  {
    key: "functional" as const,
    title: "Funkčné — mapa",
    required: false,
    summary:
      "Google Maps na stránke Kontakt. Iframe sa načíta až po súhlase. Google môže na svojej doméne nastaviť vlastné súbory cookie (napr. NID, CONSENT, SOCS).",
    cookies: [
      {
        name: "NID, CONSENT, SOCS a ďalšie",
        purpose: "Zobrazenie interaktívnej mapy a ochrana pred zneužitím služby Google Maps.",
        duration: "podľa Google (zvyčajne až 6–13 mesiacov)",
        provider: "Google Ireland Limited / Google LLC",
      },
    ],
  },
] as const;

export const cookieNotes = [
  {
    title: "Čo na webe nie je",
    body: "Nemáme zapnuté meranie návštevnosti, remarketing ani sociálne pluginy, ktoré by samy od seba nastavovali sledovacie súbory cookie. Odkazy na Facebook, Instagram, objednávku jedla a rezerváciu ubytovania vedú na iné weby — tam platia ich vlastné pravidlá.",
  },
  {
    title: "Osobné údaje z formulára",
    body: `Kontaktný formulár nie je cookie. Správu, meno, e-mail a telefón spracúva ${site.legalName} na vybavenie dopytu a doručí ich na ${site.email}. Údaje nepredávame tretím stranám na marketing.`,
  },
  {
    title: "Ako zmeniť výber",
    body: "Súhlas môžete kedykoľvek zmeniť cez Nastavenia cookies v pätičke alebo na tejto stránke. Odmietnutie mapy web nerozbije — na Kontakte ostane odkaz do Google Maps.",
  },
] as const;
