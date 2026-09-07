"use client";

import { useMutation } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { api } from "@convex/_generated/api";
import { Button } from "@bolt-energy/ui/components/button";
import { Input, Textarea } from "@bolt-energy/ui/components/inputs";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/lib/cart";
import { cartTotals, formatEgp, unitSuffix } from "@/lib/money";
import { Link, useRouter } from "@/i18n/navigation";

function isValidEgyptPhone(value: string) {
  const digits = value.replace(/[\s\-()]/g, "");
  return /^(?:\+?20|0020)?0?1[0125]\d{8}$/.test(digits);
}

export default function CartPage() {
  const t = useTranslations("shop");
  const common = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const session = authClient.useSession();
  const { items, updateQuantity, removeItem, clear } = useCart();
  const createOrder = useMutation(api.orders.create);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const totals = cartTotals(items);
  const unitLabels = {
    perWatt: t("perWatt"),
    perMetre: t("perMetre"),
    perKw: t("perKw"),
  };

  useEffect(() => {
    if (prefilled || !session.data?.user) return;
    const user = session.data.user;
    if (user.name) setName((current) => current || user.name);
    if (user.email) setEmail((current) => current || user.email);
    setPrefilled(true);
  }, [session.data, prefilled]);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-bold text-(--primary)">{t("cartTitle")}</h1>
      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-dashed border-(--border) bg-(--secondary)/40 px-6 py-10">
          <p className="text-lg text-(--muted-foreground)">{t("cartEmpty")}</p>
          <Link
            href="/shop"
            className="inline-flex h-11 items-center justify-center rounded-md bg-(--primary) px-5 text-sm font-medium text-white hover:opacity-90"
          >
            {t("browseShop")}
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {items.map((item) => {
            const unit =
              item.priceEgp !== undefined
                ? `${formatEgp(item.priceEgp, locale)} ${t("exVat")}${unitSuffix(item.priceUnit, unitLabels)}`
                : t("quoteOnly");
            const line =
              item.priceEgp !== undefined
                ? formatEgp(item.priceEgp * item.quantity, locale)
                : t("quoteOnly");

            return (
              <div
                key={item.productId}
                className="flex flex-col gap-3 border-b border-(--border) py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{locale === "ar" ? item.nameAr : item.nameEn}</p>
                  <p className="text-sm text-(--muted-foreground)">{item.sku}</p>
                  <p className="mt-1 text-sm text-(--muted-foreground)">
                    {t("unitPrice")}: {unit}
                  </p>
                  <p className="text-sm font-medium">
                    {t("lineTotal")}: {line}
                  </p>
                </div>
                <div className="flex items-center gap-3 self-start sm:self-center">
                  <div className="flex items-center rounded-md border border-(--border)">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="flex h-10 w-10 items-center justify-center text-lg disabled:opacity-40"
                      disabled={item.quantity <= 1}
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="min-w-10 text-center text-sm font-medium tabular-nums" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="flex h-10 w-10 items-center justify-center text-lg"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-(--destructive)"
                    onClick={() => removeItem(item.productId)}
                  >
                    {t("remove")}
                  </button>
                </div>
              </div>
            );
          })}
          <div className="space-y-1 text-sm">
            <p>
              {t("subtotal")}: {formatEgp(totals.subtotalExVat, locale)}
            </p>
            <p>
              {t("vat")}: {formatEgp(totals.vatAmount, locale)}
            </p>
            <p className="text-lg font-semibold">
              {t("total")}: {formatEgp(totals.totalIncVat, locale)}
            </p>
            {totals.hasQuoteOnly ? <p>{t("quoteOnly")}</p> : null}
            <p className="text-(--muted-foreground)">{t("noShipping")}</p>
          </div>
          <form
            className="space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              if (!isValidEgyptPhone(phone)) {
                setError(t("phoneInvalid"));
                return;
              }
              setLoading(true);
              try {
                const result = await createOrder({
                  name,
                  phone,
                  email: email || undefined,
                  remarks: remarks || undefined,
                  locale: locale === "ar" ? "ar" : "en",
                  items: items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                  })),
                });
                clear();
                router.push(`/shop/order/${result.orderNumber}`);
              } catch (err) {
                setError(err instanceof Error ? err.message : common("failed"));
              } finally {
                setLoading(false);
              }
            }}
          >
            <p className="rounded-md border border-(--border) bg-(--secondary)/50 px-3 py-2 text-sm text-(--muted-foreground)">
              {t("noShipping")}
            </p>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <div className="space-y-1">
              <label htmlFor="checkout-name" className="text-sm font-medium">
                {t("name")}
              </label>
              <Input
                id="checkout-name"
                required
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="checkout-phone" className="text-sm font-medium">
                {t("phone")}
              </label>
              <Input
                id="checkout-phone"
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="01xxxxxxxxx"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="checkout-email" className="text-sm font-medium">
                {t("email")}
              </label>
              <Input
                id="checkout-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="checkout-remarks" className="text-sm font-medium">
                {t("remarks")}
              </label>
              <Textarea
                id="checkout-remarks"
                value={remarks}
                onChange={(event) => setRemarks(event.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t("submitting") : t("placeOrder")}
            </Button>
          </form>
        </div>
      )}
    </main>
  );
}
