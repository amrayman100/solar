"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@bolt-energy/ui/components/sheet";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useCart, type CartItem } from "@/lib/cart";
import { cartTotals, formatEgp } from "@/lib/money";

export type CartAddedDetail = {
  productId: string;
  nameEn: string;
  nameAr: string;
};

export function CartCheckoutPrompt() {
  const t = useTranslations("shop");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { items, count } = useCart();
  const [open, setOpen] = useState(false);
  const [lastName, setLastName] = useState("");

  const onCartPage = pathname.startsWith("/shop/cart");
  const showStickyBar = count > 0 && !onCartPage && !open;

  useEffect(() => {
    const onAdded = (event: Event) => {
      const detail = (event as CustomEvent<CartAddedDetail>).detail;
      if (detail) {
        setLastName(locale === "ar" ? detail.nameAr : detail.nameEn);
      }
      setOpen(true);
    };
    window.addEventListener("bolt-cart-added", onAdded);
    return () => window.removeEventListener("bolt-cart-added", onAdded);
  }, [locale]);

  const goToCheckout = () => {
    setOpen(false);
    // Defer navigation so Radix sheet unmount doesn't cancel the route change.
    window.setTimeout(() => {
      router.push("/shop/cart");
    }, 0);
  };

  const totals = cartTotals(items);
  const preview = items.slice(0, 3);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="z-[110] mx-auto max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border-(--border) bg-white p-0 sm:max-w-lg"
        >
          <SheetHeader className="space-y-1 border-b border-(--border) px-5 py-4 text-start">
            <SheetTitle className="flex items-center gap-2 text-lg text-(--primary)">
              <ShoppingBag className="h-5 w-5" />
              {t("addedTitle")}
            </SheetTitle>
            <SheetDescription className="text-sm text-(--muted-foreground)">
              {lastName ? t("addedItem", { name: lastName }) : t("added")}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-3 px-5 py-4">
            {preview.map((item) => (
              <CartPreviewRow key={item.productId} item={item} />
            ))}
            {items.length > 3 ? (
              <p className="text-xs text-(--muted-foreground)">
                {t("andMore", { count: items.length - 3 })}
              </p>
            ) : null}
            <div className="rounded-lg bg-(--secondary)/60 px-3 py-2 text-sm">
              <p className="font-medium">
                {t("cartItems", { count })} · {t("total")}:{" "}
                {formatEgp(totals.totalIncVat, locale)}
              </p>
              <p className="mt-1 text-xs text-(--muted-foreground)">{t("noShipping")}</p>
            </div>
          </div>

          <SheetFooter className="flex flex-col gap-2 border-t border-(--border) px-5 py-4 sm:flex-col">
            <button
              type="button"
              onClick={goToCheckout}
              className="inline-flex h-12 w-full items-center justify-center rounded-md bg-(--primary) px-4 text-base font-semibold text-(--primary-foreground) hover:opacity-90"
            >
              {t("goToCheckout")}
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-full items-center justify-center rounded-md border border-(--border) bg-white px-4 text-sm font-medium text-(--foreground) hover:bg-(--secondary)"
              onClick={() => setOpen(false)}
            >
              {t("keepShopping")}
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {showStickyBar ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4">
          <div className="pointer-events-auto mx-auto flex max-w-lg items-center gap-3 rounded-xl border border-emerald-200 bg-white/95 px-3 py-3 shadow-lg backdrop-blur sm:px-4">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-emerald-950">
                {t("cartItems", { count })}
              </p>
              <p className="truncate text-xs text-(--muted-foreground)">
                {t("total")}: {formatEgp(totals.totalIncVat, locale)}
              </p>
            </div>
            <button
              type="button"
              onClick={goToCheckout}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-(--primary) px-4 text-sm font-semibold text-(--primary-foreground) hover:opacity-90"
            >
              {t("checkout")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function CartPreviewRow({ item }: { item: CartItem }) {
  const locale = useLocale();
  const t = useTranslations("shop");
  const name = locale === "ar" ? item.nameAr : item.nameEn;
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <div className="min-w-0">
        <p className="truncate font-medium text-(--foreground)">{name}</p>
        <p className="text-xs text-(--muted-foreground)">
          {t("quantity")}: {item.quantity}
        </p>
      </div>
      <p className="shrink-0 tabular-nums">
        {item.priceEgp !== undefined
          ? formatEgp(item.priceEgp * item.quantity, locale)
          : t("quoteOnly")}
      </p>
    </div>
  );
}
