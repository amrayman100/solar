"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const products = [
  { href: "/product/grid-tied", key: "gridTied" },
  { href: "/product/off-grid", key: "offGrid" },
  { href: "/product/solar-irrigation", key: "irrigation" },
  { href: "/product/solar-heating", key: "heating" },
  { href: "/product/ev", key: "ev" },
  { href: "/product/construction", key: "construction" },
] as const;

export function ProductsDropdown({
  triggerClassName,
  triggerText,
}: {
  triggerClassName?: string;
  triggerText?: string;
}) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const menuId = useId();

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 180);
  };

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={
          triggerClassName ??
          "flex items-center gap-1 font-medium text-emerald-950 hover:text-emerald-800"
        }
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {triggerText ?? t("products")}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div id={menuId} className="absolute start-0 top-full z-[200] pt-2">
          <div
            role="menu"
            className="w-56 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
          >
            {products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                role="menuitem"
                className="block px-4 py-2 text-[#015231] hover:bg-emerald-50 hover:text-[#00bd70]"
                onClick={() => setOpen(false)}
              >
                {t(product.key)}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
