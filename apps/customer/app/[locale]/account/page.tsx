"use client";

import { useMutation, useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { api } from "@convex/_generated/api";
import { Button } from "@bolt-energy/ui/components/button";
import { Input } from "@bolt-energy/ui/components/inputs";
import { FormField, FormStep } from "@/components/form-field";
import { authClient } from "@/lib/auth-client";
import { formatEgp } from "@/lib/money";
import { Link } from "@/i18n/navigation";

export default function AccountPage() {
  const t = useTranslations("account");
  const shop = useTranslations("shop");
  const common = useTranslations("common");
  const session = authClient.useSession();
  const ensure = useMutation(api.profiles.ensure);
  const orders = useQuery(api.orders.listMine, session.data ? {} : "skip");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session.data) void ensure();
  }, [session.data, ensure]);

  if (session.isPending) return <main className="px-4 py-16">{common("loading")}</main>;

  if (!session.data) {
    return (
      <main className="mx-auto w-full max-w-md px-4 py-12">
        <h1 className="text-3xl font-bold text-[#015231]">{t("title")}</h1>
        <p className="mt-2 text-base leading-relaxed text-[#1f3d32]">{t("intro")}</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setError("");
            const result =
              mode === "signin"
                ? await authClient.signIn.email({ email, password })
                : await authClient.signUp.email({ email, password, name });
            if (result.error) setError(result.error.message ?? common("failed"));
          }}
        >
          {error ? (
            <p role="alert" className="rounded-md border border-red-800 bg-red-50 px-3 py-2 text-sm font-medium text-red-900">
              {error}
            </p>
          ) : null}
          <FormStep step={1} title={mode === "signin" ? t("signin") : t("signup")} hint={t("intro")}>
            {mode === "signup" ? (
              <FormField label={t("name")} hint={t("nameHint")} required>
                <Input
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </FormField>
            ) : null}
            <FormField label={t("email")} hint={t("emailHint")} required>
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormField>
            <FormField label={t("password")} hint={t("passwordHint")} required>
              <Input
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormField>
          </FormStep>
          <Button
            type="submit"
            className="h-12 w-full bg-[#015231] text-base font-bold text-white hover:bg-[#014028]"
          >
            {mode === "signin" ? t("signin") : t("signup")}
          </Button>
          <button
            type="button"
            className="inline-flex min-h-11 w-full items-center justify-center text-sm font-semibold text-[#015231] underline"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? t("signup") : t("signin")}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-(--primary)">{t("title")}</h1>
        <Button onClick={() => void authClient.signOut()}>{t("signout")}</Button>
      </div>
      <p className="mt-2 text-sm text-(--muted-foreground)">{session.data.user.email}</p>
      <h2 className="mt-8 text-xl font-semibold">{t("orders")}</h2>
      {orders === undefined ? (
        <p className="mt-4 text-sm">{common("loading")}</p>
      ) : orders.length === 0 ? (
        <p className="mt-4">{t("empty")}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {orders.map((order) => (
            <li key={order._id} className="rounded-lg border border-(--border) p-4">
              <Link href={`/shop/order/${order.orderNumber}`} className="font-semibold">
                {order.orderNumber}
              </Link>
              <p className="text-sm">
                {order.status} · {formatEgp(order.totalIncVat, "en")} · {shop("incVat")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
