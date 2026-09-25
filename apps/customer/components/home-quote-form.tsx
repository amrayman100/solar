"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { QuoteDialog } from "@/components/quote-dialog";

export function HomeQuoteForm() {
  const t = useTranslations("home");
  const addressId = useId();
  const usageId = useId();
  const [city, setCity] = useState("");
  const [monthlyConsumption, setMonthlyConsumption] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex w-full justify-center px-1">
        <form
          className="flex w-full max-w-md flex-col gap-3 rounded-3xl bg-[#01261f]/90 p-4 text-start"
          onSubmit={(event) => {
            event.preventDefault();
            if (!monthlyConsumption) return;
            setOpen(true);
          }}
        >
          <div className="space-y-1.5">
            <label htmlFor={addressId} className="block text-sm font-semibold text-white">
              {t("addressLabel")}
              <span className="ms-1 text-red-200" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id={addressId}
              type="text"
              required
              autoComplete="address-level2"
              placeholder={t("address")}
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="h-12 w-full rounded-full border border-white bg-white px-4 text-base text-[#123028] shadow-sm placeholder:text-[#3f4f48] focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor={usageId} className="block text-sm font-semibold text-white">
              {t("monthlyConsumptionLabel")}
              <span className="ms-1 text-red-200" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id={usageId}
              type="number"
              min={1}
              required
              inputMode="numeric"
              placeholder={t("monthlyConsumption")}
              aria-describedby={`${usageId}-hint`}
              value={monthlyConsumption}
              onChange={(event) => setMonthlyConsumption(event.target.value)}
              className="h-12 w-full rounded-full border border-white bg-white px-4 text-base text-[#123028] shadow-sm placeholder:text-[#3f4f48] focus:outline-none focus:ring-2 focus:ring-white"
            />
            <p id={`${usageId}-hint`} className="text-sm leading-snug text-white">
              {t("monthlyConsumptionHint")}
            </p>
          </div>
          <button
            type="submit"
            className="h-12 w-full rounded-full bg-white px-4 text-base font-bold text-[#015231] hover:bg-[#f3f7f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 sm:text-lg"
          >
            {t("calculateFee")}
          </button>
        </form>
      </div>
      <QuoteDialog
        slug="grid-tied"
        open={open}
        onClose={() => setOpen(false)}
        defaults={{ city, monthlyConsumption }}
      />
    </>
  );
}
