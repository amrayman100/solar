"use client";

import { useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { api } from "@convex/_generated/api";
import { Button } from "@bolt-energy/ui/components/button";
import { Input, Select, Textarea } from "@bolt-energy/ui/components/inputs";
import { FormField, FormStep } from "@/components/form-field";

export default function ContactPage() {
  const t = useTranslations("contact");
  const createContact = useMutation(api.leads.createContact);
  const createAmbassador = useMutation(api.leads.createAmbassador);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("general");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [ambassador, setAmbassador] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[#015231]">{t("title")}</h1>
      <p className="mt-2 text-base leading-relaxed text-[#1f3d32]">{t("intro")}</p>
      {done ? (
        <p className="mt-6 text-base font-medium text-[#123028]" role="status">
          {t("thanks")}
        </p>
      ) : (
        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setError("");
            setLoading(true);
            try {
              if (ambassador) {
                await createAmbassador({ name, phoneNumber, email: email || undefined });
              } else {
                await createContact({
                  name,
                  phoneNumber,
                  email: email || undefined,
                  type,
                  message,
                });
              }
              setDone(true);
            } catch (err) {
              setError(err instanceof Error ? err.message : t("failed"));
            } finally {
              setLoading(false);
            }
          }}
        >
          {error ? (
            <p role="alert" className="rounded-md border border-red-800 bg-red-50 px-3 py-2 text-sm font-medium text-red-900">
              {error}
            </p>
          ) : null}
          <FormStep step={1} title={t("stepTitle")} hint={t("stepHint")}>
            <FormField label={t("name")} hint={t("nameHint")} required>
              <Input
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormField>
            <FormField label={t("phone")} hint={t("phoneHint")} required>
              <Input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </FormField>
            <FormField label={t("email")} hint={t("emailHint")}>
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormField>
            <label className="flex min-h-11 items-start gap-3 rounded-md border border-[#015231]/20 bg-[#f7fbf9] p-3 text-[#123028]">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 accent-[#015231]"
                checked={ambassador}
                onChange={(event) => setAmbassador(event.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold">{t("ambassador")}</span>
                <span className="mt-1 block text-sm font-normal leading-snug text-[#1f3d32]">
                  {t("ambassadorHint")}
                </span>
              </span>
            </label>
            {ambassador ? null : (
              <>
                <FormField label={t("type")} hint={t("typeHint")} required>
                  <Select value={type} onChange={(event) => setType(event.target.value)}>
                    <option value="general">{t("typeGeneral")}</option>
                    <option value="sales">{t("typeSales")}</option>
                    <option value="support">{t("typeSupport")}</option>
                  </Select>
                </FormField>
                <FormField label={t("message")} hint={t("messageHint")} required>
                  <Textarea
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </FormField>
              </>
            )}
          </FormStep>
          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full bg-[#015231] text-base font-bold text-white hover:bg-[#014028]"
          >
            {loading ? t("sending") : t("send")}
          </Button>
        </form>
      )}
    </main>
  );
}
