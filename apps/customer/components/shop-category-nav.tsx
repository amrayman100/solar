"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type CategoryChipData = {
  _id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
};

export function ShopCategoryNav({
  activeSlug,
  categories,
}: {
  activeSlug?: string;
  categories?: CategoryChipData[];
}) {
  const t = useTranslations("shop");
  const locale = useLocale();
  const allActive = !activeSlug;

  return (
    <nav
      aria-label={t("categoriesNav")}
      className="sticky top-[4.25rem] z-[90] border border-(--border) bg-white/95 px-3 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90 lg:top-[4.5rem] lg:rounded-xl"
    >
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
        <CategoryChip href="/shop" active={allActive} label={t("allCategories")} />
        {categories === undefined ? (
          <span className="shrink-0 self-center text-xs text-(--muted-foreground)">
            {t("loadingCategories")}
          </span>
        ) : (
          categories.map((category) => {
            const label = locale === "ar" ? category.nameAr : category.nameEn;
            return (
              <CategoryChip
                key={category._id}
                href={`/shop/category/${category.slug}`}
                active={activeSlug === category.slug}
                label={label}
              />
            );
          })
        )}
      </div>
    </nav>
  );
}

function CategoryChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      prefetch
      aria-current={active ? "page" : undefined}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
        active
          ? "bg-[#00bd70] text-white"
          : "border border-(--border) bg-white text-emerald-950 hover:border-[#00bd70]/40 hover:bg-emerald-50"
      }`}
    >
      {label}
    </Link>
  );
}
