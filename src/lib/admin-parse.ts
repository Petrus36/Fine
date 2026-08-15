/** Shared parsing for the admin forms — everything arrives as a string. */

export function text(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export function optionalText(value: FormDataEntryValue | null): string | null {
  const trimmed = text(value);
  return trimmed.length > 0 ? trimmed : null;
}

/** "1, 7,9" -> [1, 7, 9] */
export function parseAllergens(value: FormDataEntryValue | null): number[] {
  return text(value)
    .split(/[,\s]+/)
    .map((part) => Number.parseInt(part, 10))
    .filter((n) => Number.isInteger(n) && n > 0);
}

/** Accepts "5,90" and "5.90". Returns a decimal string Prisma can store, or null. */
export function parsePrice(value: FormDataEntryValue | null): string | null {
  const raw = text(value).replace(",", ".");
  if (!raw) return null;
  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed.toFixed(2);
}

/** Turns a Prisma Decimal (or null) back into the value shown in an input. */
export function priceToInput(price: { toNumber(): number } | null): string {
  return price ? price.toNumber().toFixed(2) : "";
}

export function parseCheckbox(value: FormDataEntryValue | null): boolean {
  return value === "on" || value === "true" || value === "1";
}

/** "kuracie, bravčové" -> ["kuracie", "bravčové"] */
export function parseOptions(value: FormDataEntryValue | null): string[] {
  return text(value)
    .split(/[,\n]/)
    .map((part) => part.trim())
    .filter(Boolean);
}
