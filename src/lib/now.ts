import "server-only";

/**
 * Reading the clock during render is impure, so date-dependent defaults go
 * through this helper instead.
 */
export async function currentDate(): Promise<Date> {
  return new Date();
}
