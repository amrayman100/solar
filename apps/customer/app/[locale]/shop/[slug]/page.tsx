"use client";

import { useQuery } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { api } from "@convex/_generated/api";
import { useCart } from "@/lib/cart";
import { formatEgp, unitSuffix } from "@/lib/money";
import { Link } from "@/i18n/navigation";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const locale = useLocale();
  const t = useTranslations("shop");
  const common = useTranslations("common");
  const product = useQuery(api.catalogue.getProductBySlug, { slug: params.slug });
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (product === undefined) {
    return <main className="px-4 py-16">{common("loading")}</main>;
  }
  if (!product) {
    return <main className="px-4 py-16">{common("notFound")}</main>;
  }

  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const spec = locale === "ar" ? product.specAr : product.specEn;
  const availabilityLabel =
    product.availability === "in_stock"
      ? t("inStock")
      : product.availability === "on_request"
        ? t("onRequest")
        : t("quoteOnly");

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 lg:px-8">
      <Link href="/shop" className="text-sm font-semibold text-[#015231] underline-offset-2 hover:underline">
        {t("browseShop")}
      </Link>
      <p className="mt-4 text-sm font-medium tracking-wide text-[#3f4f48]">{product.sku}</p>
      <h1 className="mt-2 text-3xl font-bold text-[#015231]">{name}</h1>
      <p className="mt-3 inline-flex rounded-full bg-[#f3f7f5] px-2.5 py-1 text-xs font-semibold text-[#015231]">
        {availabilityLabel}
      </p>
      <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-[#1f3d32]">{spec}</p>
      <p className="mt-6 text-2xl font-semibold text-[#123028]">
        {product.priceEgp !== undefined
          ? `${formatEgp(product.priceEgp, locale)} ${t("exVat")}${unitSuffix(product.priceUnit, {
              perWatt: t("perWatt"),
              perMetre: t("perMetre"),
              perKw: t("perKw"),
            })}`
          : t("quoteOnly")}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#1f3d32]">{t("noShipping")}</p>
      <button
        type="button"
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#015231] px-4 text-base font-semibold text-white hover:bg-[#014028] sm:w-auto sm:min-w-56"
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
    </main>
  );
}
