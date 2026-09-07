"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { QuoteDialog } from "@/components/quote-dialog";

export function HomeQuoteForm() {
  const t = useTranslations("home");
  const [city, setCity] = useState("");
  const [monthlyConsumption, setMonthlyConsumption] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex w-full justify-center px-1">
        <form
          className="flex w-full max-w-[371px] flex-col gap-0"
          onSubmit={(event) => {
            event.preventDefault();
            if (!monthlyConsumption) return;
            setOpen(true);
          }}
        >
          <input
            type="text"
            required
            placeholder={t("address")}
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="h-11 w-full rounded-[5.75rem] border-0 bg-white px-4 text-center text-base text-[#797979] shadow-sm placeholder:text-center placeholder:text-[#797979] sm:h-[2.75rem] md:h-[3.25rem] md:px-6 md:text-[1.5rem]"
          />
          <input
            type="number"
            min={1}
            required
            inputMode="numeric"
            placeholder={t("monthlyConsumption")}
            value={monthlyConsumption}
            onChange={(event) => setMonthlyConsumption(event.target.value)}
            className="mt-3 h-11 w-full rounded-[5.75rem] border-0 bg-white px-4 text-center text-base text-[#797979] shadow-sm placeholder:text-center placeholder:text-[#797979] sm:h-[2.75rem] md:mt-[1.0625rem] md:h-[3.25rem] md:px-6 md:text-[1.5rem]"
          />
          <button
            type="submit"
            className="mt-3 h-12 w-full whitespace-nowrap rounded-[7.8125rem] bg-[#00bd70] px-4 text-base font-bold text-white hover:bg-[#00bd70]/90 sm:h-[3.125rem] sm:text-lg md:mt-[1.1875rem] md:h-[4.0625rem] md:p-[0.625rem] md:text-[2rem]"
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
