"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@bolt-energy/ui/components/button";
import { useCart } from "@/lib/cart";
import { formatEgp, unitSuffix } from "@/lib/money";
import type { Id } from "@convex/_generated/dataModel";

export type ShopProduct = {
  _id: Id<"products">;
  slug: string;
  sku: string;
  nameEn: string;
  nameAr: string;
  specEn: string;
  specAr: string;
  priceEgp?: number;
  priceUnit: "each" | "per_watt" | "per_metre" | "per_kw";
  availability: "in_stock" | "on_request" | "quote_only";
};

export function ProductCard({ product }: { product: ShopProduct }) {
  const locale = useLocale();
  const t = useTranslations("shop");
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const spec = locale === "ar" ? product.specAr : product.specEn;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <article className="flex flex-col rounded-xl border border-(--border) bg-white p-4">
      <Link href={`/shop/${product.slug}`} className="space-y-2">
        <p className="text-xs text-(--muted-foreground)">{product.sku}</p>
        <h3 className="text-base font-semibold text-(--primary)">{name}</h3>
        <p className="line-clamp-3 text-sm text-(--muted-foreground)">{spec}</p>
        <p className="text-sm font-medium">
          {product.priceEgp !== undefined
            ? `${formatEgp(product.priceEgp, locale)} ${t("exVat")}${unitSuffix(product.priceUnit, {
                perWatt: t("perWatt"),
                perMetre: t("perMetre"),
                perKw: t("perKw"),
              })}`
            : t("quoteOnly")}
        </p>
        <p className="text-xs">
          {product.availability === "in_stock"
            ? t("inStock")
            : product.availability === "on_request"
              ? t("onRequest")
              : t("quoteOnly")}
        </p>
      </Link>
      <Button
        className="mt-4"
        onClick={() => {
          addItem({
            productId: product._id,
            slug: product.slug,
            sku: product.sku,
            nameEn: product.nameEn,
            nameAr: product.nameAr,
            priceEgp: product.priceEgp,
            priceUnit: product.priceUnit,
          });
          setAdded(true);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setAdded(false), 1800);
        }}
      >
        {added ? t("added") : t("addToCart")}
      </Button>
    </article>
  );
}
