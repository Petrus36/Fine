import type { Allergen, DailyMenu, WeeklyDish } from "@/types/menu";

/**
 * Sample content that matches the design. Replaced by Neon/Prisma queries once
 * the admin panel is wired up — the shapes are identical.
 */

export const dailyMenus: DailyMenu[] = [
  {
    id: "tuesday",
    weekday: "TUESDAY",
    items: [
      {
        id: "tue-soup",
        course: "SOUP",
        name: "Zemiakovo–hubová na kyslo",
        allergens: [1, 7, 9],
        price: null,
      },
      {
        id: "tue-main-1",
        course: "MAIN_ONE",
        name: "Grilovaný bravčový karé, volské oko, omáčka zo zeleného korenia, opekané zemiaky",
        allergens: [3, 7],
        price: 11.9,
      },
      {
        id: "tue-main-2",
        course: "MAIN_TWO",
        name: "Marinované kuracie prsia teriyaki, cuketa, brokolica, jazmínová ryža",
        allergens: [1, 6],
        price: 11.9,
      },
      {
        id: "tue-dessert",
        course: "DESSERT",
        name: "Palacinka plnená marmeládou",
        allergens: [1, 3, 7],
        price: null,
      },
      {
        id: "tue-special",
        course: "DAILY_SPECIAL",
        name: "Tom Yum s krevetami, ryžové rezance, šampiňóny, edamame, koriander",
        allergens: [2, 4, 6],
        price: 12.9,
      },
    ],
  },
  {
    id: "wednesday",
    weekday: "WEDNESDAY",
    items: [
      {
        id: "wed-soup",
        course: "SOUP",
        name: "Fazuľová so zeleninou",
        allergens: [9],
        price: null,
      },
      {
        id: "wed-main-1",
        course: "MAIN_ONE",
        name: "Grilované kuracie prsia, restovaná zelenina, zemiakové placky, čedarová omáčka",
        allergens: [1, 3, 7],
        price: 11.9,
      },
      {
        id: "wed-main-2",
        course: "MAIN_TWO",
        name: "Tagliatelle s cherry paradajkami, cesnakom, cuketou, grana padano a krevetami",
        allergens: [1, 2, 3, 7],
        price: 11.9,
      },
      {
        id: "wed-dessert",
        course: "DESSERT",
        name: "Perníkový koláč s čokoládovou polevou",
        allergens: [1, 3, 7],
        price: null,
      },
      {
        id: "wed-special",
        course: "DAILY_SPECIAL",
        name: "Sushi rolls s lososom, mango, paštrnák, wakame šalát, marinovaný zázvor",
        allergens: [4, 6, 11],
        price: 12.9,
      },
    ],
  },
  {
    id: "thursday",
    weekday: "THURSDAY",
    items: [
      {
        id: "thu-soup",
        course: "SOUP",
        name: "Slepačí vývar s krupicovou haluškou a zeleninou",
        allergens: [1, 3, 9],
        price: null,
      },
      {
        id: "thu-main-1",
        course: "MAIN_ONE",
        name: "Hovädzie ražničky na zelených fazuľkách, biela reďkovka, jazmínová ryža",
        allergens: [6],
        price: 11.9,
      },
      {
        id: "thu-main-2",
        course: "MAIN_TWO",
        name: "Zeleninový šalát s údeným lososom, vajíčkom, francúzskym dresingom a bagetou",
        allergens: [1, 3, 4, 10],
        price: 11.9,
      },
      {
        id: "thu-dessert",
        course: "DESSERT",
        name: "Jablkovo–orechový závin",
        allergens: [1, 3, 7, 8],
        price: null,
      },
      {
        id: "thu-special",
        course: "DAILY_SPECIAL",
        name: "Nasi Goreng, kuracie mäso, chilli, vajíčko, mrkva, jarná cibuľka",
        allergens: [3, 6],
        price: 12.9,
      },
    ],
  },
  {
    id: "friday",
    weekday: "FRIDAY",
    items: [
      {
        id: "fri-soup",
        course: "SOUP",
        name: "Thajská Tom Yum",
        allergens: [2, 4, 6],
        price: null,
      },
      {
        id: "fri-main-1",
        course: "MAIN_ONE",
        name: "Pečený kurací rezeň, zemiakovo–mrkvové pyré, šalát z červenej repy",
        allergens: [1, 3, 7],
        price: 11.9,
      },
      {
        id: "fri-main-2",
        course: "MAIN_TWO",
        name: "Stredomorský šalát s krevetami, mangom, čerstvou uhorkou, mätou a krutónmi",
        allergens: [1, 2],
        price: 11.9,
      },
      {
        id: "fri-dessert",
        course: "DESSERT",
        name: "Pomarančový rez",
        allergens: [1, 3, 7],
        price: null,
      },
      {
        id: "fri-special",
        course: "DAILY_SPECIAL",
        name: "Poke bowl s tuniakom, uhorka, kapusta, avokádo, mango, ryža, edamame, wakame",
        allergens: [4, 6, 11],
        price: 12.9,
      },
    ],
  },
];

export const weeklyDishes: WeeklyDish[] = [
  {
    id: "poke-bowl",
    name: "Poké bowl",
    description:
      "Ryža, avokádo, mango, uhorka, edamame, wakame, reďkovka a sezam.",
    allergens: [4, 6, 11],
    price: 13.9,
    options: ["Kuracie mäso", "Hovädzie", "Losos", "Tofu"],
  },
  {
    id: "pad-thai",
    name: "Pad Thai",
    description:
      "Ryžové rezance, tamarindová omáčka, arašidy, jarná cibuľka, klíčky a limetka.",
    allergens: [1, 3, 5, 6],
    price: 13.9,
    options: ["Kuracie mäso", "Krevety", "Hovädzie", "Tofu"],
  },
  {
    id: "ramen",
    name: "Ramen",
    description:
      "Vývar varený dvanásť hodín, pšeničné rezance, vajíčko, huby shiitake a nori.",
    allergens: [1, 3, 6, 9],
    price: 14.9,
    options: ["Bravčová chashu", "Kuracie mäso", "Krevety", "Tofu"],
  },
  {
    id: "grilovana-krkovicka",
    name: "Grilovaná krkovička",
    description:
      "Grilovaná bravčová krkovička s bylinkovým maslom a pečeným zemiakom.",
    allergens: [1, 7],
    price: 14.9,
    options: [
      "Bylinkové hranolky",
      "Grilovaná zelenina",
      "Zemiakové pyré",
      "Opekané zemiaky",
    ],
  },
];

export const allergens: Allergen[] = [
  {
    number: 1,
    label:
      "Obilniny obsahujúce lepok (pšenica, raž, jačmeň, ovos, špalda, kamut alebo ich hybridné odrody)",
  },
  { number: 2, label: "Kôrovce a výrobky z nich" },
  { number: 3, label: "Vajcia a výrobky z nich" },
  { number: 4, label: "Ryby a výrobky z nich" },
  { number: 5, label: "Arašidy a výrobky z nich" },
  { number: 6, label: "Sójové zrná a výrobky z nich" },
  { number: 7, label: "Mlieko a výrobky z neho" },
  {
    number: 8,
    label:
      "Orechy — mandle, lieskové orechy, vlašské orechy, kešu, pekanové orechy, para orechy, pistácie, makadamové orechy a queenslandské orechy a výrobky z nich",
  },
  { number: 9, label: "Zeler a výrobky z neho" },
  { number: 10, label: "Horčica a výrobky z nej" },
  { number: 11, label: "Sezamové semená a výrobky z nich" },
  {
    number: 12,
    label:
      "Oxid siričitý a siričitany v koncentráciách vyšších ako 10 mg/kg alebo 10 mg/l",
  },
  { number: 13, label: "Vlčí bôb a výrobky z neho" },
  { number: 14, label: "Mäkkýše a výrobky z nich" },
];
