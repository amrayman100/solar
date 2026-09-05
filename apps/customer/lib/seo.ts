import type { Metadata } from "next";
import { SITE_URL } from "@/lib/structured-data";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  alternates?: Metadata["alternates"];
};

type LocalizedPageMetadataOptions = Omit<PageMetadataOptions, "path"> & {
  /** Path after the locale segment, e.g. `""`, `"/about"`, `"/resources/slug"`. */
  pathWithoutLocale: string;
  locale: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  image = "/drone-4-1.jpeg",
  imageAlt = "Bolt Energy solar installation in Egypt",
  noIndex = false,
  alternates,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      ...alternates,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function createLocalizedPageMetadata({
  pathWithoutLocale,
  locale,
  alternates,
  ...rest
}: LocalizedPageMetadataOptions): Metadata {
  const suffix =
    !pathWithoutLocale || pathWithoutLocale === "/"
      ? ""
      : pathWithoutLocale.startsWith("/")
        ? pathWithoutLocale
        : `/${pathWithoutLocale}`;

  return createPageMetadata({
    ...rest,
    path: `/${locale}${suffix}`,
    alternates: {
      languages: {
        en: `${SITE_URL}/en${suffix}`,
        ar: `${SITE_URL}/ar${suffix}`,
        "x-default": `${SITE_URL}/en${suffix}`,
      },
      ...alternates,
    },
  });
}
