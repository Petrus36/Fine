import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";

const sql = neon(process.env.DATABASE_URL);

const allergens = [
  [1, "Obilniny obsahujúce lepok (pšenica, raž, jačmeň, ovos, špalda, kamut alebo ich hybridné odrody)"],
  [2, "Kôrovce a výrobky z nich"],
  [3, "Vajcia a výrobky z nich"],
  [4, "Ryby a výrobky z nich"],
  [5, "Arašidy a výrobky z nich"],
  [6, "Sójové zrná a výrobky z nich"],
  [7, "Mlieko a výrobky z neho"],
  [8, "Orechy — mandle, lieskové orechy, vlašské orechy, kešu, pekanové orechy, para orechy, pistácie, makadamové orechy a queenslandské orechy a výrobky z nich"],
  [9, "Zeler a výrobky z neho"],
  [10, "Horčica a výrobky z nej"],
  [11, "Sezamové semená a výrobky z nich"],
  [12, "Oxid siričitý a siričitany v koncentráciách vyšších ako 10 mg/kg alebo 10 mg/l"],
  [13, "Vlčí bôb a výrobky z neho"],
  [14, "Mäkkýše a výrobky z nich"],
];

const dailyMenus = [
  {
    weekday: "TUESDAY",
    items: [
      ["SOUP", "Zemiakovo–hubová na kyslo", [1, 7, 9], null, 0],
      ["MAIN_ONE", "Grilovaný bravčový karé, volské oko, omáčka zo zeleného korenia, opekané zemiaky", [3, 7], 11.9, 1],
      ["MAIN_TWO", "Marinované kuracie prsia teriyaki, cuketa, brokolica, jazmínová ryža", [1, 6], 11.9, 2],
      ["DESSERT", "Palacinka plnená marmeládou", [1, 3, 7], null, 3],
      ["DAILY_SPECIAL", "Tom Yum s krevetami, ryžové rezance, šampiňóny, edamame, koriander", [2, 4, 6], 12.9, 4],
    ],
  },
  {
    weekday: "WEDNESDAY",
    items: [
      ["SOUP", "Fazuľová so zeleninou", [9], null, 0],
      ["MAIN_ONE", "Grilované kuracie prsia, restovaná zelenina, zemiakové placky, čedarová omáčka", [1, 3, 7], 11.9, 1],
      ["MAIN_TWO", "Tagliatelle s cherry paradajkami, cesnakom, cuketou, grana padano a krevetami", [1, 2, 3, 7], 11.9, 2],
      ["DESSERT", "Perníkový koláč s čokoládovou polevou", [1, 3, 7], null, 3],
      ["DAILY_SPECIAL", "Sushi rolls s lososom, mango, paštrnák, wakame šalát, marinovaný zázvor", [4, 6, 11], 12.9, 4],
    ],
  },
  {
    weekday: "THURSDAY",
    items: [
      ["SOUP", "Slepačí vývar s krupicovou haluškou a zeleninou", [1, 3, 9], null, 0],
      ["MAIN_ONE", "Hovädzie ražničky na zelených fazuľkách, biela reďkovka, jazmínová ryža", [6], 11.9, 1],
      ["MAIN_TWO", "Zeleninový šalát s údeným lososom, vajíčkom, francúzskym dresingom a bagetou", [1, 3, 4, 10], 11.9, 2],
      ["DESSERT", "Jablkovo–orechový závin", [1, 3, 7, 8], null, 3],
      ["DAILY_SPECIAL", "Nasi Goreng, kuracie mäso, chilli, vajíčko, mrkva, jarná cibuľka", [3, 6], 12.9, 4],
    ],
  },
  {
    weekday: "FRIDAY",
    items: [
      ["SOUP", "Thajská Tom Yum", [2, 4, 6], null, 0],
      ["MAIN_ONE", "Pečený kurací rezeň, zemiakovo–mrkvové pyré, šalát z červenej repy", [1, 3, 7], 11.9, 1],
      ["MAIN_TWO", "Stredomorský šalát s krevetami, mangom, čerstvou uhorkou, mätou a krutónmi", [1, 2], 11.9, 2],
      ["DESSERT", "Pomarančový rez", [1, 3, 7], null, 3],
      ["DAILY_SPECIAL", "Poke bowl s tuniakom, uhorka, kapusta, avokádo, mango, ryža, edamame, wakame", [4, 6, 11], 12.9, 4],
    ],
  },
];

const weeklyDishes = [
  ["Poké bowl", "Ryža, avokádo, mango, uhorka, edamame, wakame, reďkovka a sezam.", [4, 6, 11], 13.9, 0, ["Kuracie mäso", "Hovädzie", "Losos", "Tofu"]],
  ["Pad Thai", "Ryžové rezance, tamarindová omáčka, arašidy, jarná cibuľka, klíčky a limetka.", [1, 3, 5, 6], 13.9, 1, ["Kuracie mäso", "Krevety", "Hovädzie", "Tofu"]],
  ["Ramen", "Vývar varený dvanásť hodín, pšeničné rezance, vajíčko, huby shiitake a nori.", [1, 3, 6, 9], 14.9, 2, ["Bravčová chashu", "Kuracie mäso", "Krevety", "Tofu"]],
  ["Grilovaná krkovička", "Grilovaná bravčová krkovička s bylinkovým maslom a pečeným zemiakom.", [1, 7], 14.9, 3, ["Bylinkové hranolky", "Grilovaná zelenina", "Zemiakové pyré", "Opekané zemiaky"]],
];

function isoWeek(date) {
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  return Math.ceil(((tmp - yearStart) / 86400000 + 1) / 7);
}

const now = new Date();
const year = now.getFullYear();
const weekNumber = isoWeek(now);

console.log(`Seeding week ${weekNumber}/${year}…`);

await sql`DELETE FROM "WeeklyDishOption"`;
await sql`DELETE FROM "WeeklyDish"`;
await sql`DELETE FROM "MenuItem"`;
await sql`DELETE FROM "DailyMenu"`;
await sql`DELETE FROM "MenuWeek"`;
await sql`DELETE FROM "Allergen"`;

for (const [number, label] of allergens) {
  await sql`INSERT INTO "Allergen" ("id", "number", "label") VALUES (${randomUUID()}, ${number}, ${label})`;
}

for (const [name, description, allergenList, price, position, options] of weeklyDishes) {
  const dishId = randomUUID();
  await sql`
    INSERT INTO "WeeklyDish" ("id", "name", "description", "allergens", "price", "active", "position", "createdAt", "updatedAt")
    VALUES (${dishId}, ${name}, ${description}, ${allergenList}, ${price}, true, ${position}, NOW(), NOW())
  `;
  for (const [optionIndex, optionLabel] of options.entries()) {
    await sql`
      INSERT INTO "WeeklyDishOption" ("id", "dishId", "label", "position")
      VALUES (${randomUUID()}, ${dishId}, ${optionLabel}, ${optionIndex})
    `;
  }
}

const weekId = randomUUID();
await sql`
  INSERT INTO "MenuWeek" ("id", "weekNumber", "year", "published", "createdAt", "updatedAt")
  VALUES (${weekId}, ${weekNumber}, ${year}, true, NOW(), NOW())
`;

for (const day of dailyMenus) {
  const dayId = randomUUID();
  await sql`
    INSERT INTO "DailyMenu" ("id", "weekId", "weekday")
    VALUES (${dayId}, ${weekId}, ${day.weekday}::"Weekday")
  `;
  for (const [course, name, allergenList, price, position] of day.items) {
    await sql`
      INSERT INTO "MenuItem" ("id", "dailyMenuId", "course", "name", "allergens", "price", "position")
      VALUES (${randomUUID()}, ${dayId}, ${course}::"Course", ${name}, ${allergenList}, ${price}, ${position})
    `;
  }
}

console.log("Seed complete.");
