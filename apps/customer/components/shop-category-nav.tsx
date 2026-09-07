"use client";

import { useLocale, useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ShopCategory } from "@/components/shop-shell";

export function ShopCategoryNav({
  activeSlug,
  categories,
  counts,
  totalCount,
  search,
  onSearchChange,
  onSelectSlug,
}: {
  activeSlug: string | null;
  categories?: ShopCategory[];
  counts: Map<string, number>;
  totalCount?: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectSlug: (slug: string | null) => void;
}) {
  const t = useTranslations("shop");
  const locale = useLocale();
  const allActive = !activeSlug;

  return (
    <div className="sticky top-[4.25rem] z-[90] space-y-3 rounded-2xl border border-(--border) bg-white/95 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90 sm:p-4 lg:top-[4.5rem]">
      <label className="relative block">
        <span className="sr-only">{t("searchLabel")}</span>
        <Search
          className="pointer-events-none absolute top-1/2 start-3 h-4 w-4 -translate-y-1/2 text-(--muted-foreground)"
          aria-hidden
        />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full rounded-xl border border-(--border) bg-white py-2.5 pe-3 ps-10 text-sm outline-none ring-[#00bd70] placeholder:text-(--muted-foreground) focus:ring-2"
        />
      </label>

      <nav aria-label={t("categoriesNav")}>
        <div className="-mx-1 flex snap-x snap-proximity gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [scrollbar-width:thin] lg:flex-wrap lg:overflow-visible lg:snap-none">
          <CategoryChip
            href="/shop"
            active={allActive}
            label={t("allCategories")}
            count={totalCount}
            onSelect={() => onSelectSlug(null)}
          />
          {categories === undefined
            ? Array.from({ length: 6 }).map((_, index) => (
                <span
                  key={index}
                  className="h-9 w-28 animate-pulse rounded-full bg-(--muted)"
                />
              ))
            : categories.map((category) => {
                const label =
                  locale === "ar" ? category.nameAr : category.nameEn;
                return (
                  <CategoryChip
                    key={category._id}
                    href={`/shop/category/${category.slug}`}
                    active={activeSlug === category.slug}
                    label={label}
                    count={counts.get(category._id)}
                    onSelect={() => onSelectSlug(category.slug)}
                  />
                );
              })}
        </div>
      </nav>
    </div>
  );
}

function CategoryChip({
  href,
  active,
  label,
  count,
  onSelect,
}: {
  href: string;
  active: boolean;
  label: string;
  count?: number;
  onSelect: () => void;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      prefetch
      onClick={onSelect}
      aria-current={active ? "page" : undefined}
      className={`inline-flex shrink-0 snap-start items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-[#00bd70] text-white shadow-sm"
          : "border border-(--border) bg-white text-emerald-950 hover:border-[#00bd70]/40 hover:bg-emerald-50"
      }`}
    >
      {label}
      {count !== undefined ? (
        <span
          className={`tabular-nums text-xs ${
            active ? "text-white/80" : "text-(--muted-foreground)"
          }`}
        >
          {count}
        </span>
      ) : null}
    </Link>
  );
}
