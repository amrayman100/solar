"use client";

import { useQuery } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { api } from "@convex/_generated/api";
import { formatEgp } from "@/lib/money";
import { BUSINESS_INFO } from "@/lib/structured-data";
import { Link } from "@/i18n/navigation";

export default function OrderConfirmationPage() {
  const params = useParams<{ orderNumber: string }>();
  const locale = useLocale();
  const t = useTranslations("shop");
  const common = useTranslations("common");
  const order = useQuery(api.orders.getByNumber, { orderNumber: params.orderNumber });

  if (order === undefined) return <main className="px-4 py-16">{common("loading")}</main>;
  if (!order) return <main className="px-4 py-16">{common("notFound")}</main>;

  const whatsappHref = `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
    `Order ${order.order.orderNumber}`
  )}`;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-(--primary)">{t("confirmation")}</h1>
      <p className="mt-2 text-lg">
        {t("orderNumber")}: <strong>{order.order.orderNumber}</strong>
      </p>
      <p className="mt-4 text-sm text-(--muted-foreground)">{t("confirmationNext")}</p>
      <p className="mt-2 text-sm text-(--muted-foreground)">{t("noShipping")}</p>
      <ul className="mt-6 space-y-2">
        {order.items.map((item) => (
          <li key={item._id} className="flex justify-between gap-4 text-sm">
            <span>
              {locale === "ar" ? item.nameAr : item.nameEn} × {item.quantity}
            </span>
            <span>
              {item.lineTotalEgp !== undefined ? formatEgp(item.lineTotalEgp, locale) : t("quoteOnly")}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-semibold">
        {t("total")}: {formatEgp(order.order.totalIncVat, locale)}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          className="inline-flex h-11 items-center justify-center rounded-lg bg-[#25D366] px-4 text-sm font-medium text-white"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("whatsapp")}
        </a>
        <Link
          href="/shop"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-(--border) px-4 text-sm font-medium text-(--primary) hover:bg-(--secondary)"
        >
          {t("continueShopping")}
        </Link>
      </div>
    </main>
  );
}
