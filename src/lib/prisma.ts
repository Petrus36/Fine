import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function getConnectionString(): string | undefined {
  return (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env["Storage_POSTGRES_PRISMA_URL"] ??
    process.env["Storage_DATABASE_URL"] ??
    process.env.POSTGRES_URL ??
    process.env["Storage_POSTGRES_URL"] ??
    process.env["Storage_DATABASE_URL_UNPOOLED"]
  );
}

/**
 * Neon’s serverless driver (used on Vercel) does not support channel_binding.
 * Neon’s dashboard now appends it by default, which makes Prisma queries throw
 * in production while local Node can still look fine.
 */
function forServerlessDriver(url: string): string {
  const parsed = new URL(url);
  parsed.searchParams.delete("channel_binding");
  return parsed.toString();
}

function createClient() {
  const connectionString = getConnectionString();

  if (!connectionString) {
    throw new Error(
      "Database URL is not set — add DATABASE_URL to .env or connect Postgres on Vercel.",
    );
  }

  // HTTP instead of WebSockets — WebSocket upgrades often fail in Vercel serverless.
  neonConfig.poolQueryViaFetch = true;

  return new PrismaClient({
    adapter: new PrismaNeon({ connectionString: forServerlessDriver(connectionString) }),
  });
}

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}
