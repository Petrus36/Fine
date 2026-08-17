export function formatPrice(value: number): string {
  return `${value.toFixed(2).replace(".", ",")}\u00A0€`;
}

export function formatPrices(price: number, priceAlt: number | null): string {
  return priceAlt == null ? formatPrice(price) : `${formatPrice(price)} / ${formatPrice(priceAlt)}`;
}

export function formatAllergens(numbers: number[]): string {
  return numbers.length ? `(${numbers.join(",")})` : "";
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
