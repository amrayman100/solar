"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BUSINESS_INFO } from "@/lib/structured-data";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="w-full bg-[#015231] text-white">
      <div className="w-full px-4 py-12 lg:px-12">
        <div className="mx-auto mb-8 grid max-w-7xl grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex w-full flex-col items-center gap-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <Image
                alt="Bolt Energy"
                src="/footer-logo-white.svg"
                height={26}
                width={24}
                className="object-contain"
              />
              <h3 className="text-xl font-bold text-white">Bolt Energy</h3>
            </div>
            <p className="text-sm leading-relaxed text-white">{t("blurb")}</p>
            <div className="mt-2 flex justify-center gap-4">
              <a
                href={BUSINESS_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bolt Energy on Instagram"
                className="transition-opacity hover:opacity-80"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={BUSINESS_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bolt Energy on Facebook"
                className="transition-opacity hover:opacity-80"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={BUSINESS_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bolt Energy on LinkedIn"
                className="transition-opacity hover:opacity-80"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4 text-center">
            <h4 className="text-sm font-bold text-white">{t("company")}</h4>
            <div className="flex flex-col items-center gap-2 text-sm text-white">
              <Link href="/about" className="transition-opacity hover:opacity-80">
                {t("aboutUs")}
              </Link>
              <Link href="/projects" className="transition-opacity hover:opacity-80">
                {t("ourProjects")}
              </Link>
              <Link href="/resources" className="transition-opacity hover:opacity-80">
                {t("solarResources")}
              </Link>
              <Link href="/shop" className="transition-opacity hover:opacity-80">
                {nav("shop")}
              </Link>
              <Link href="/contact-us" className="transition-opacity hover:opacity-80">
                {nav("contact")}
              </Link>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4 text-center">
            <h4 className="text-sm font-bold text-white">{nav("products")}</h4>
            <div className="flex flex-col items-center gap-2 text-sm text-white">
              <Link href="/product/grid-tied" className="transition-opacity hover:opacity-80">
                {nav("gridTied")}
              </Link>
              <Link href="/product/off-grid" className="transition-opacity hover:opacity-80">
                {nav("offGrid")}
              </Link>
              <Link href="/product/solar-irrigation" className="transition-opacity hover:opacity-80">
                {nav("irrigation")}
              </Link>
              <Link href="/product/solar-heating" className="transition-opacity hover:opacity-80">
                {nav("heating")}
              </Link>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4 text-center">
            <h4 className="text-sm font-bold text-white">{nav("contact")}</h4>
            <div className="flex flex-col items-center gap-3 text-sm text-white">
              <div className="flex items-center justify-center gap-2">
                <Image
                  src="/footer-location-icon.svg"
                  alt=""
                  width={11}
                  height={14}
                  className="shrink-0 object-contain"
                />
                <span>{t("address")}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Image
                  src="/footer-email-icon.svg"
                  alt=""
                  width={15}
                  height={12}
                  className="shrink-0 object-contain"
                />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="transition-opacity hover:opacity-80"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Image
                  src="/footer-phone-icon.svg"
                  alt=""
                  width={13}
                  height={13}
                  className="shrink-0 object-contain"
                />
                <a
                  href={`tel:${BUSINESS_INFO.telephoneDisplay}`}
                  className="transition-opacity hover:opacity-80"
                >
                  {BUSINESS_INFO.telephoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-6">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm text-white">{t("copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
