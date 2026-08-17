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

function createClient() {
  const connectionString = getConnectionString();

  if (!connectionString) {
    throw new Error(
      "Database URL is not set — add DATABASE_URL to .env or connect Postgres on Vercel.",
    );
  }

  return new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });
}

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}
