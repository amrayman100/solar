"use client";

import { useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { api } from "@convex/_generated/api";
import { Button } from "@bolt-energy/ui/components/button";
import { Input, Select, Textarea } from "@bolt-energy/ui/components/inputs";

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

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-12">
      <h1 className="text-3xl font-bold text-(--primary)">{t("title")}</h1>
      {done ? (
        <p className="mt-6">{t("thanks")}</p>
      ) : (
        <form
          className="mt-6 space-y-3"
          onSubmit={async (event) => {
            event.preventDefault();
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
          }}
        >
          <Input
            required
            placeholder={t("name")}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            required
            placeholder={t("phone")}
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <Input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="general">{t("typeGeneral")}</option>
            <option value="sales">{t("typeSales")}</option>
            <option value="support">{t("typeSupport")}</option>
          </Select>
          <Textarea
            rows={5}
            placeholder={t("message")}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={ambassador}
              onChange={(event) => setAmbassador(event.target.checked)}
            />
            {t("ambassador")}
          </label>
          <Button type="submit" className="w-full">
            {t("send")}
          </Button>
        </form>
      )}
    </main>
  );
}
