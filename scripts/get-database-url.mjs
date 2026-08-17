/** Shared connection string lookup for local scripts and Vercel Postgres. */
export function getDatabaseUrl({ preferUnpooled = false } = {}) {
  if (preferUnpooled) {
    return (
      process.env.DATABASE_URL_UNPOOLED ??
      process.env["Storage_DATABASE_URL_UNPOOLED"] ??
      process.env.POSTGRES_URL_NON_POOLING ??
      process.env["Storage_POSTGRES_URL_NON_POOLING"] ??
      getDatabaseUrl()
    );
  }

  return (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env["Storage_POSTGRES_PRISMA_URL"] ??
    process.env["Storage_DATABASE_URL"] ??
    process.env.POSTGRES_URL ??
    process.env["Storage_POSTGRES_URL"]
  );
}
