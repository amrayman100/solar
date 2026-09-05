import type { MetadataRoute } from "next";
import { LOCALES } from "@bolt-energy/models";
import { SITE_URL } from "@/lib/structured-data";

const DISALLOWED_SUFFIXES = [
  "/proposal/",
  "/account",
  "/account/",
  "/shop/cart",
  "/shop/cart/",
  "/shop/order/",
] as const;

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    "/api/",
    ...LOCALES.flatMap((locale) =>
      DISALLOWED_SUFFIXES.map((suffix) => `/${locale}${suffix}`)
    ),
  ];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
