"use client";

import { useQuery } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { api } from "@convex/_generated/api";
import { ProductCard } from "@/components/product-card";

export default function ShopCategoryPage() {
  const params = useParams<{ slug: string }>();
  const locale = useLocale();
  const t = useTranslations("shop");
  const common = useTranslations("common");
  const category = useQuery(api.catalogue.getCategoryBySlug, { slug: params.slug });
  const products = useQuery(api.catalogue.listPublishedByCategory, {
    categorySlug: params.slug,
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-bold text-(--primary)">
        {category
          ? locale === "ar"
            ? category.nameAr
            : category.nameEn
          : t("title")}
      </h1>
      {products === undefined ? (
        <p className="mt-10 text-sm text-(--muted-foreground)">{common("loading")}</p>
      ) : products.length === 0 ? (
        <p className="mt-10">{t("empty")}</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
