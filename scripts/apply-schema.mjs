import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { execSync } from "node:child_process";
import { getDatabaseUrl } from "./get-database-url.mjs";

const url = getDatabaseUrl({ preferUnpooled: true });
if (!url) {
  console.error("Database URL is missing — set DATABASE_URL or Storage_DATABASE_URL.");
  process.exit(1);
}

const sql = neon(url);

const script = execSync(
  "npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script",
  { encoding: "utf8" },
);

// Strip Prisma CLI log lines before the SQL.
const statements = script
  .split("\n")
  .filter((line) => !line.startsWith("Loaded Prisma") && !line.startsWith("npm warn"))
  .join("\n")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

console.log(`Applying ${statements.length} SQL statements…`);

for (const statement of statements) {
  const preview = statement.split("\n")[0].replace(/^--\s*/, "");
  try {
    await sql.query(statement);
    console.log("✓", preview);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("already exists")) {
      console.log("· skipped (exists):", preview);
      continue;
    }
    console.error("✗", preview, message);
    process.exit(1);
  }
}

console.log("Schema applied.");
