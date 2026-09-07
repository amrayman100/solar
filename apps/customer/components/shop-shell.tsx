"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { ShopCategoryNav } from "@/components/shop-category-nav";
import { usePathname } from "@/i18n/navigation";

type ShopCatalogueResult = {
  categories: Array<{
    _id: Id<"categories">;
    slug: string;
    nameEn: string;
    nameAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    sortOrder: number;
  }>;
  products: Array<{
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
  }>;
  activeCategory: {
    _id: Id<"categories">;
    slug: string;
    nameEn: string;
    nameAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    sortOrder: number;
  } | null;
};

const ShopCatalogueContext = createContext<ShopCatalogueResult | undefined>(
  undefined
);

export function useShopCatalogue() {
  return useContext(ShopCatalogueContext);
}

export function ShopShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const match = pathname.match(/\/shop\/category\/([^/]+)/);
  const activeSlug = match?.[1];
  const catalogue = useQuery(api.catalogue.getShopCatalogue, {
    categorySlug: activeSlug,
  });

  return (
    <ShopCatalogueContext.Provider value={catalogue}>
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 lg:px-8">
        <ShopCategoryNav
          activeSlug={activeSlug}
          categories={catalogue?.categories}
        />
        <div className="pb-10">{children}</div>
      </div>
    </ShopCatalogueContext.Provider>
  );
}
