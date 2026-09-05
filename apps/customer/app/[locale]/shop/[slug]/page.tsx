"use client";

import { useQuery } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { api } from "@convex/_generated/api";
import { Button } from "@bolt-energy/ui/components/button";
import { useCart } from "@/lib/cart";
import { formatEgp, unitSuffix } from "@/lib/money";

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
      <p className="text-sm text-(--muted-foreground)">{product.sku}</p>
      <h1 className="mt-2 text-3xl font-bold text-(--primary)">{name}</h1>
      <p className="mt-3 inline-flex rounded-md border border-(--border) bg-(--secondary)/50 px-2.5 py-1 text-xs font-medium">
        {availabilityLabel}
      </p>
      <p className="mt-4 whitespace-pre-wrap text-(--muted-foreground)">{spec}</p>
      <p className="mt-6 text-2xl font-semibold">
        {product.priceEgp !== undefined
          ? `${formatEgp(product.priceEgp, locale)} ${t("exVat")}${unitSuffix(product.priceUnit, {
              perWatt: t("perWatt"),
              perMetre: t("perMetre"),
              perKw: t("perKw"),
            })}`
          : t("quoteOnly")}
      </p>
      <p className="mt-2 text-sm">{t("noShipping")}</p>
      <Button
        className="mt-6"
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
    </main>
  );
}
