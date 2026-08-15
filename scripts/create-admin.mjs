import "dotenv/config";
import { randomBytes, randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is missing from .env");
  process.exit(1);
}

const [email, providedPassword] = process.argv.slice(2);

if (!email || !email.includes("@")) {
  console.error("Usage: npm run admin:create -- <email> [password]");
  process.exit(1);
}

// Ambiguous characters are left out so the password can be read out loud.
function generatePassword() {
  const alphabet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(randomBytes(16))
    .map((byte) => alphabet[byte % alphabet.length])
    .join("");
}

const password = providedPassword ?? generatePassword();
const passwordHash = await bcrypt.hash(password, 12);
const sql = neon(url);

await sql`
  INSERT INTO "User" ("id", "email", "name", "passwordHash", "role", "createdAt", "updatedAt")
  VALUES (${randomUUID()}, ${email.toLowerCase()}, ${"Admin"}, ${passwordHash}, 'ADMIN', now(), now())
  ON CONFLICT ("email") DO UPDATE
  SET "passwordHash" = EXCLUDED."passwordHash",
      "role" = 'ADMIN',
      "updatedAt" = now()
`;

console.log("\nAdmin account ready.");
console.log("  E-mail:  ", email.toLowerCase());
console.log("  Password:", password);
console.log("\nSign in at /admin/login.\n");
