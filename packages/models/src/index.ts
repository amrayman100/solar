export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const VAT_RATE = 0.14;

export type StaffRole = "admin" | "staff";

export type ShopAvailability = "in_stock" | "on_request" | "quote_only";

export type PriceUnit = "each" | "per_watt" | "per_metre" | "per_kw";

export * from "./proposals";
export * from "./parameters-json";
