import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProductLanding } from "@/components/product-landing";
import { createPageMetadata } from "@/lib/seo";
import { getProductPage } from "@/lib/product-pages";

export function productPage(slug: string) {
  async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const content = getProductPage(slug, locale);
    return createPageMetadata({
      title: content.metaTitle,
      description: content.metaDescription,
      path: `/${locale}${content.path}`,
      keywords: [...content.keywords],
      image: content.image,
      imageAlt: content.imageAlt,
    });
  }

  async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const content = getProductPage(slug, locale);
    return <ProductLanding content={content} />;
  }

  return { generateMetadata, Page };
}
