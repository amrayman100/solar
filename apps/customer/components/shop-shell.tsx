"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { ShopCategoryNav } from "@/components/shop-category-nav";
import { ShopCatalogue } from "@/components/shop-catalogue";
import { usePathname } from "@/i18n/navigation";

export type ShopCategory = {
  _id: Id<"categories">;
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  sortOrder: number;
};

export type ShopProductCard = {
  _id: Id<"products">;
  slug: string;
  sku: string;
  categoryId: Id<"categories">;
  nameEn: string;
  nameAr: string;
  specEn: string;
  specAr: string;
  priceEgp?: number;
  priceUnit: "each" | "per_watt" | "per_metre" | "per_kw";
  availability: "in_stock" | "on_request" | "quote_only";
};

function categorySlugFromPath(pathname: string): string | null {
  const match = pathname.match(/\/shop\/category\/([^/]+)/);
  return match?.[1] ?? null;
}

export function ShopShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const routeSlug = categorySlugFromPath(pathname);
  const [optimisticSlug, setOptimisticSlug] = useState<string | null | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");

  const activeSlug =
    optimisticSlug === undefined ? routeSlug : optimisticSlug;

  useEffect(() => {
    if (optimisticSlug === undefined) return;
    if (optimisticSlug === routeSlug) {
      setOptimisticSlug(undefined);
    }
  }, [routeSlug, optimisticSlug]);

  const categories = useQuery(api.catalogue.listCategories);
  const products = useQuery(api.catalogue.listPublished);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const product of products ?? []) {
      map.set(product.categoryId, (map.get(product.categoryId) ?? 0) + 1);
    }
    return map;
  }, [products]);

  const activeCategory =
    categories?.find((category) => category.slug === activeSlug) ?? null;

  const visibleProducts = useMemo(() => {
    if (!products) return undefined;
    const scoped = activeCategory
      ? products.filter((product) => product.categoryId === activeCategory._id)
      : products;
    return scoped;
  }, [products, activeCategory]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 lg:px-8">
      <ShopCategoryNav
        activeSlug={activeSlug}
        categories={categories}
        counts={counts}
        totalCount={products?.length}
        search={search}
        onSearchChange={setSearch}
        onSelectSlug={setOptimisticSlug}
      />
      <div className="pb-10">
        <ShopCatalogue
          activeCategory={activeCategory}
          products={visibleProducts}
          search={search}
        />
        {children}
      </div>
    </div>
  );
}
