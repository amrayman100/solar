"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const RELATED_HREFS = [
  "/product/grid-tied",
  "/product/off-grid",
  "/product/solar-irrigation",
  "/product/solar-heating",
] as const;

const RELATED_KEYS = [
  ["gridTiedLabel", "gridTiedDescription"],
  ["offGridLabel", "offGridDescription"],
  ["irrigationLabel", "irrigationDescription"],
  ["heatingLabel", "heatingDescription"],
] as const;

export function RelatedProducts({ currentHref }: { currentHref?: string }) {
  const t = useTranslations("related");
  const products = RELATED_HREFS.map((href, index) => {
    const [labelKey, descriptionKey] = RELATED_KEYS[index]!;
    return {
      href,
      label: t(labelKey),
      description: t(descriptionKey),
    };
  }).filter((product) => product.href !== currentHref);

  return (
    <section className="w-full bg-[#f6f6f6] px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-[#015231]">
          {t("heading")}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {products.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="rounded-xl border border-[#015231]/10 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-[#015231]">{product.label}</h3>
              <p className="mt-1 text-sm text-gray-600">{product.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/resources"
            className="rounded-[8px] bg-[#00bd70] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#00bd70]/90"
          >
            {t("resources")}
          </Link>
          <Link
            href="/projects"
            className="rounded-[8px] border border-[#015231] px-6 py-2.5 text-sm font-bold text-[#015231] hover:bg-white"
          >
            {t("projects")}
          </Link>
        </div>
      </div>
    </section>
  );
}
