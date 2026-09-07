"use client";

import Image from "next/image";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart";
import { NavDropdown } from "@/components/nav-dropdown";

const productHrefs = [
  { href: "/product/grid-tied", key: "gridTied" },
  { href: "/product/off-grid", key: "offGrid" },
  { href: "/product/solar-irrigation", key: "irrigation" },
  { href: "/product/solar-heating", key: "heating" },
  { href: "/product/ev", key: "ev" },
  { href: "/product/construction", key: "construction" },
] as const;

const serviceHrefs = [
  { href: "/services/maintenance", key: "maintenance" },
  { href: "/services/solar-monitoring", key: "monitoring" },
] as const;

const moreHrefs = [
  { href: "/projects", key: "projects" },
  { href: "/resources", key: "resources" },
  { href: "/proposal/whole-sale", key: "wholesale" },
  { href: "/product/construction", key: "construction" },
] as const;

const navLinkClass =
  "whitespace-nowrap text-sm font-medium text-emerald-950 transition-colors hover:text-emerald-800";

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const otherLocale = locale === "ar" ? "en" : "ar";
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const productItems = productHrefs.map((item) => ({
    href: item.href,
    label: t(item.key),
  }));
  const serviceItems = serviceHrefs.map((item) => ({
    href: item.href,
    label: t(item.key),
  }));
  const moreItems = moreHrefs.map((item) => ({
    href: item.href,
    label: t(item.key),
  }));

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-emerald-950/5 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-6 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="Bolt Energy"
            width={64}
            height={64}
            className="h-11 w-11 object-cover sm:h-12 sm:w-12"
          />
          <span className="hidden text-lg font-semibold tracking-tight text-emerald-950 sm:block">
            Bolt Energy
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 xl:gap-6 lg:flex">
          <Link href="/about" className={navLinkClass}>
            {t("about")}
          </Link>
          <NavDropdown label={t("products")} items={productItems} triggerClassName={navLinkClass + " flex items-center gap-1"} />
          <Link href="/shop" className={navLinkClass}>
            {t("shop")}
          </Link>
          <NavDropdown label={t("services")} items={serviceItems} triggerClassName={navLinkClass + " flex items-center gap-1"} />
          <NavDropdown label={t("more")} items={moreItems} triggerClassName={navLinkClass + " flex items-center gap-1"} />
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            locale={otherLocale}
            className="hidden text-sm font-medium text-[#00bd70] sm:inline"
          >
            {t("langSwitch")}
          </Link>
          <Link
            href="/shop/cart"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-emerald-950 transition-colors hover:bg-emerald-50"
            aria-label={t("cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute -top-0.5 -end-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#00bd70] px-1 text-[10px] font-bold leading-none text-white">
                {count}
              </span>
            ) : null}
          </Link>
          <Link
            href="/contact-us"
            className="hidden whitespace-nowrap rounded-full bg-[#00bd70] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#00a862] lg:inline-flex"
          >
            {t("contact")}
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-emerald-950 hover:bg-emerald-50 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="flex max-h-[min(70vh,32rem)] w-full flex-col gap-1 overflow-y-auto border-t border-gray-100 px-4 py-3 lg:hidden">
          <Link
            href="/"
            locale={otherLocale}
            className="rounded-md px-3 py-2 text-sm font-medium text-[#00bd70]"
            onClick={() => setOpen(false)}
          >
            {t("langSwitch")}
          </Link>
          <MobileLink href="/" label={t("home")} onNavigate={() => setOpen(false)} />
          <MobileLink href="/about" label={t("about")} onNavigate={() => setOpen(false)} />
          <MobileLink href="/shop" label={t("shop")} onNavigate={() => setOpen(false)} />
          <MobileLink href="/projects" label={t("projects")} onNavigate={() => setOpen(false)} />
          <MobileLink href="/resources" label={t("resources")} onNavigate={() => setOpen(false)} />

          <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-wide text-[#015231]/70">
            {t("products")}
          </p>
          {productHrefs.map((link) => (
            <MobileLink
              key={link.href}
              href={link.href}
              label={t(link.key)}
              onNavigate={() => setOpen(false)}
            />
          ))}

          <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-wide text-[#015231]/70">
            {t("services")}
          </p>
          {serviceHrefs.map((link) => (
            <MobileLink
              key={link.href}
              href={link.href}
              label={t(link.key)}
              onNavigate={() => setOpen(false)}
            />
          ))}

          <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-wide text-[#015231]/70">
            {t("more")}
          </p>
          <MobileLink
            href="/proposal/whole-sale"
            label={t("wholesale")}
            onNavigate={() => setOpen(false)}
          />
          <MobileLink
            href="/product/construction"
            label={t("construction")}
            onNavigate={() => setOpen(false)}
          />
          <MobileLink href="/account" label={t("account")} onNavigate={() => setOpen(false)} />

          <Link
            href="/contact-us"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-[#00bd70] px-4 py-2.5 text-sm font-medium text-white"
          >
            {t("contact")}
          </Link>
        </div>
      ) : null}
    </header>
  );
}

function MobileLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="rounded-md px-3 py-2 text-base font-medium text-emerald-950 hover:bg-emerald-50"
    >
      {label}
    </Link>
  );
}
