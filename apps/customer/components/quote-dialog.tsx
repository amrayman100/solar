"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { QuoteForm } from "@/components/quote-form";

export function QuoteDialog({
  slug,
  open,
  onClose,
  defaults,
}: {
  slug: string;
  open: boolean;
  onClose: () => void;
  defaults?: { city?: string; monthlyConsumption?: string };
}) {
  const t = useTranslations("cta");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const heading = dialogRef.current?.querySelector<HTMLElement>("[data-quote-heading]");
    heading?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center overflow-y-auto p-4 py-10 sm:items-center">
      <button
        type="button"
        className="fixed inset-0 bg-black/60"
        aria-label={t("closeQuote")}
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("quoteDialog")}
        className="relative z-10 w-full max-w-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute end-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#015231] shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015231]"
          aria-label={t("closeQuote")}
        >
          <X className="h-5 w-5" />
        </button>
        <QuoteForm slug={slug} defaults={defaults} />
      </div>
    </div>
  );
}
