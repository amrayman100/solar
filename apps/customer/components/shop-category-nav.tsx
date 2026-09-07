"use client";

import { useEffect, useRef, useState } from "react";
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState({ start: false, end: false });
  const allActive = !activeSlug;
  const isRtl = locale === "ar";

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateOverflow = () => {
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      const scrollPos = Math.abs(el.scrollLeft);
      const start = scrollPos > 4;
      const end = maxScroll - scrollPos > 4;
      setOverflow({ start, end });
    };

    updateOverflow();
    el.addEventListener("scroll", updateOverflow, { passive: true });
    const resizeObserver = new ResizeObserver(updateOverflow);
    resizeObserver.observe(el);
    window.addEventListener("resize", updateOverflow);

    return () => {
      el.removeEventListener("scroll", updateOverflow);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateOverflow);
    };
  }, [categories, isRtl]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>('[aria-current="page"]');
    if (!active) return;
    active.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeSlug, categories]);

  // Logical fades so Arabic (RTL) edges match scroll start/end.
  const fadeAxis = isRtl ? "to left" : "to right";
  const maskImage =
    overflow.start && overflow.end
      ? `linear-gradient(${fadeAxis}, transparent, black 1.25rem, black calc(100% - 1.25rem), transparent)`
      : overflow.start
        ? `linear-gradient(${fadeAxis}, transparent, black 1.25rem, black 100%)`
        : overflow.end
          ? `linear-gradient(${fadeAxis}, black 0%, black calc(100% - 1.25rem), transparent)`
          : undefined;

  return (
    <nav
      aria-label={t("categoriesNav")}
      className="sticky top-[4.25rem] z-[90] border border-(--border) bg-white/95 px-2 py-2.5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90 sm:px-3 sm:py-3 lg:top-[4.5rem] lg:rounded-xl"
    >
      <div className="relative">
        <div
          ref={scrollerRef}
          className="shop-category-scroller flex gap-2 overflow-x-auto overscroll-x-contain scroll-smooth px-1 py-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={maskImage ? { WebkitMaskImage: maskImage, maskImage } : undefined}
        >
          <CategoryChip href="/shop" active={allActive} label={t("allCategories")} />
          {categories === undefined ? (
            <span className="shrink-0 self-center px-2 text-xs text-(--muted-foreground)">
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
