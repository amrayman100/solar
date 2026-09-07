"use client";

import { useQuery } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import { api } from "@convex/_generated/api";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/product-card";

export default function ShopPage() {
  const t = useTranslations("shop");
  const common = useTranslations("common");
  const locale = useLocale();
  const categories = useQuery(api.catalogue.listCategories);
  const products = useQuery(api.catalogue.listPublished);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-bold text-(--primary)">{t("title")}</h1>
      <p className="mt-2 max-w-2xl text-(--muted-foreground)">{t("subtitle")}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {categories?.map((category) => (
          <Link
            key={category._id}
            href={`/shop/category/${category.slug}`}
            className="rounded-full border border-(--border) px-4 py-2 text-sm hover:bg-(--secondary)"
          >
            {locale === "ar" ? category.nameAr : category.nameEn}
          </Link>
        ))}
      </div>
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
