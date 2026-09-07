"use client";

import { useDeferredValue, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ProductCard } from "@/components/product-card";
import type { ShopCategory, ShopProductCard } from "@/components/shop-shell";

export function ShopCatalogue({
  activeCategory,
  products,
  search,
}: {
  activeCategory: ShopCategory | null;
  products?: ShopProductCard[];
  search: string;
}) {
  const t = useTranslations("shop");
  const locale = useLocale();
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const filtered = useMemo(() => {
    if (!products) return [];
    if (!deferredSearch) return products;
    return products.filter((product) => {
      const haystack = [
        product.sku,
        product.nameEn,
        product.nameAr,
        product.specEn,
        product.specAr,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(deferredSearch);
    });
  }, [products, deferredSearch]);

  const title = activeCategory
    ? locale === "ar"
      ? activeCategory.nameAr
      : activeCategory.nameEn
    : t("title");

  const subtitle =
    (activeCategory
      ? locale === "ar"
        ? activeCategory.descriptionAr
        : activeCategory.descriptionEn
      : undefined) || t("subtitle");

  return (
    <div>
      <div className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-bold text-(--primary)">{title}</h1>
        <p className="mt-2 text-(--muted-foreground)">{subtitle}</p>
      </div>

      <p className="mt-4 text-sm text-(--muted-foreground)">
        {products === undefined
          ? t("loadingProducts")
          : t("productsCount", { count: filtered.length })}
      </p>

      {products === undefined ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-52 animate-pulse rounded-xl border border-(--border) bg-(--muted)/60"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-10">{search.trim() ? t("emptySearch") : t("empty")}</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
