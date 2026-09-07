"use client";

import { useLocale } from "next-intl";
import { BUSINESS_INFO } from "@/lib/structured-data";
import { useCart } from "@/lib/cart";
import { usePathname } from "@/i18n/navigation";

export function WhatsAppFab() {
  const { count } = useCart();
  const pathname = usePathname();
  const locale = useLocale();
  const liftForCart = count > 0 && !pathname.startsWith("/shop/cart");

  return (
    <a
      href={BUSINESS_INFO.whatsappUrl}
      className={`fixed end-5 z-40 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg ${
        liftForCart ? "bottom-24" : "bottom-5"
      }`}
      target="_blank"
      rel="noreferrer"
      aria-label={locale === "ar" ? "واتساب" : "WhatsApp"}
    >
      WhatsApp
    </a>
  );
}
