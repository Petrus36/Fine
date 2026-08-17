import "dotenv/config";
import { randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { catalogFallbackItems } from "../src/data/catalog-items.ts";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is missing from .env");
  process.exit(1);
}

const sql = neon(url);

await sql`DELETE FROM "CatalogItem"`;

for (const item of catalogFallbackItems) {
  await sql`
    INSERT INTO "CatalogItem" (
      "id", "page", "section", "category", "name", "description",
      "allergens", "portion", "price", "priceAlt", "position", "active",
      "createdAt", "updatedAt"
    )
    VALUES (
      ${randomUUID()},
      ${item.page}::"CatalogPage",
      ${item.section},
      ${item.category},
      ${item.name},
      ${item.description},
      ${item.allergens},
      ${item.portion},
      ${item.price},
      ${item.priceAlt},
      ${item.position},
      true,
      NOW(),
      NOW()
    )
  `;
}

console.log(`Seeded ${catalogFallbackItems.length} catalog items.`);
