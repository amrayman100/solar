import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES } from "@bolt-energy/models";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
});
