"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import { api } from "@convex/_generated/api";
import { ProductCard } from "@/components/product-card";
import { ShopCategoryNav } from "@/components/shop-category-nav";

export function ShopCatalogue({ categorySlug }: { categorySlug?: string }) {
  const t = useTranslations("shop");
  const common = useTranslations("common");
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const categories = useQuery(api.catalogue.listCategories);
  const products = useQuery(api.catalogue.listPublished);

  const activeCategory = useMemo(
    () => categories?.find((category) => category.slug === categorySlug) ?? null,
    [categories, categorySlug]
  );

  const filtered = useMemo(() => {
    if (!products) return [];
    let rows = products;
    if (activeCategory) {
      rows = rows.filter((product) => product.categoryId === activeCategory._id);
    }
    if (deferredSearch) {
      rows = rows.filter((product) => {
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
    }
    return rows;
  }, [products, activeCategory, deferredSearch]);

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
    <main className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-(--primary)">{title}</h1>
        <p className="mt-2 text-(--muted-foreground)">{subtitle}</p>
      </div>

      <div className="mt-6 space-y-4">
        <ShopCategoryNav activeSlug={categorySlug} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="block w-full max-w-md">
            <span className="sr-only">{t("searchLabel")}</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-lg border border-(--border) bg-white px-3 py-2.5 text-sm outline-none ring-[#00bd70] placeholder:text-(--muted-foreground) focus:ring-2"
            />
          </label>
          <p className="text-sm text-(--muted-foreground)">
            {products === undefined
              ? common("loading")
              : t("productsCount", { count: filtered.length })}
          </p>
        </div>
      </div>

      {products === undefined ? (
        <p className="mt-10 text-sm text-(--muted-foreground)">{common("loading")}</p>
      ) : filtered.length === 0 ? (
        <p className="mt-10">{t("empty")}</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
