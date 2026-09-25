"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
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
  const availabilityLabel =
    product.availability === "in_stock"
      ? t("inStock")
      : product.availability === "on_request"
        ? t("onRequest")
        : t("quoteOnly");

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#015231]/15 bg-white p-4 shadow-sm">
      <Link href={`/shop/${product.slug}`} className="flex min-h-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs font-medium tracking-wide text-[#3f4f48]">{product.sku}</p>
          <span className="shrink-0 rounded-full bg-[#f3f7f5] px-2 py-0.5 text-xs font-semibold text-[#015231]">
            {availabilityLabel}
          </span>
        </div>
        <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-semibold leading-snug text-[#015231]">
          {name}
        </h3>
        <p className="line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-[#1f3d32]">{spec}</p>
        <p className="mt-auto pt-2 text-lg font-semibold text-[#123028]">
          {product.priceEgp !== undefined
            ? `${formatEgp(product.priceEgp, locale)} ${t("exVat")}${unitSuffix(product.priceUnit, {
                perWatt: t("perWatt"),
                perMetre: t("perMetre"),
                perKw: t("perKw"),
              })}`
            : t("quoteOnly")}
        </p>
      </Link>
      <button
        type="button"
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#015231] px-3 text-center text-sm font-semibold text-white hover:bg-[#014028]"
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
      </button>
    </article>
  );
}
