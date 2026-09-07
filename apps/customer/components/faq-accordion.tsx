"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FaqAccordion({
  items,
}: {
  items: ReadonlyArray<{ question: string; answer: string }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl px-4">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question} className="border-b border-[#015231]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-4 text-left text-2xl font-bold text-[#015231] hover:no-underline"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open ? (
              <div className="pb-4 pt-0 text-base text-[#015231]">{item.answer}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
