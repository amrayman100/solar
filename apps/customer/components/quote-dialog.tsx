"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
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
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
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
        className="fixed inset-0 bg-black/50"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute end-4 top-4 z-20 rounded-full bg-white p-1 text-[#015231] shadow"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <QuoteForm slug={slug} defaults={defaults} />
      </div>
    </div>
  );
}
