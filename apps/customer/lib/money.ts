import { VAT_RATE } from "@bolt-energy/models";

export function formatEgp(amount: number, locale: string) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function cartTotals(items: Array<{ quantity: number; priceEgp?: number }>) {
  const subtotalExVat = items.reduce((sum, item) => {
    if (item.priceEgp === undefined) return sum;
    return sum + item.priceEgp * item.quantity;
  }, 0);
  const vatAmount = Math.round(subtotalExVat * VAT_RATE * 100) / 100;
  return {
    subtotalExVat,
    vatAmount,
    totalIncVat: Math.round((subtotalExVat + vatAmount) * 100) / 100,
    hasQuoteOnly: items.some((item) => item.priceEgp === undefined),
  };
}

export function unitSuffix(
  unit: "each" | "per_watt" | "per_metre" | "per_kw",
  labels: { perWatt: string; perMetre: string; perKw: string }
) {
  if (unit === "per_watt") return labels.perWatt;
  if (unit === "per_metre") return labels.perMetre;
  if (unit === "per_kw") return labels.perKw;
  return "";
}
