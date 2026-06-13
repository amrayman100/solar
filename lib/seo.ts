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
