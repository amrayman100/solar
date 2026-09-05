"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";

export type NavDropdownItem = {
  href: string;
  label: string;
};

export function NavDropdown({
  label,
  items,
  triggerClassName,
}: {
  label: string;
  items: readonly NavDropdownItem[];
  triggerClassName?: string;
}) {
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

  const canHover = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        if (canHover()) openMenu();
      }}
      onMouseLeave={() => {
        if (canHover()) scheduleClose();
      }}
    >
      <button
        type="button"
        className={
          triggerClassName ??
          "flex items-center gap-1 whitespace-nowrap text-sm font-medium text-emerald-950 hover:text-emerald-800"
        }
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => {
          clearCloseTimer();
          if (canHover()) {
            setOpen(true);
            return;
          }
          setOpen((value) => !value);
        }}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div id={menuId} className="absolute start-0 top-full z-[200] pt-2">
          <div
            role="menu"
            className="min-w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className="block whitespace-nowrap px-4 py-2 text-sm text-[#015231] hover:bg-emerald-50 hover:text-[#00bd70]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
