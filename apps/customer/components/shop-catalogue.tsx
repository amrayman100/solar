"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ProductCard, type ShopProduct } from "@/components/product-card";
import { useShopCatalogue } from "@/components/shop-shell";

export function ShopCatalogue() {
  const t = useTranslations("shop");
  const common = useTranslations("common");
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());
  const catalogue = useShopCatalogue();

  const activeCategory = catalogue?.activeCategory ?? null;
  const products = catalogue?.products;

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

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
          {catalogue === undefined
            ? common("loading")
            : t("productsCount", { count: filtered.length })}
        </p>
      </div>

      {catalogue === undefined ? (
        <p className="mt-10 text-sm text-(--muted-foreground)">{common("loading")}</p>
      ) : filtered.length === 0 ? (
        <p className="mt-10">{t("empty")}</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product as ShopProduct} />
          ))}
        </div>
      )}
    </div>
  );
}
