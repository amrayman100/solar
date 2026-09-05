"use client";

import { useCallback, useEffect, useState } from "react";
import type { Id } from "@convex/_generated/dataModel";

export type CartItem = {
  productId: Id<"products">;
  slug: string;
  sku: string;
  nameEn: string;
  nameAr: string;
  quantity: number;
  priceEgp?: number;
  priceUnit: "each" | "per_watt" | "per_metre" | "per_kw";
};

const STORAGE_KEY = "bolt-energy-cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("bolt-cart-changed"));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
    const refresh = () => setItems(readCart());
    window.addEventListener("storage", refresh);
    window.addEventListener("bolt-cart-changed", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("bolt-cart-changed", refresh);
    };
  }, []);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    const current = readCart();
    const existing = current.find((row) => row.productId === item.productId);
    const next = existing
      ? current.map((row) =>
          row.productId === item.productId
            ? { ...row, quantity: row.quantity + quantity }
            : row
        )
      : [...current, { ...item, quantity }];
    writeCart(next);
    setItems(next);
    window.dispatchEvent(
      new CustomEvent("bolt-cart-added", {
        detail: {
          productId: item.productId,
          nameEn: item.nameEn,
          nameAr: item.nameAr,
        },
      })
    );
  }, []);

  const updateQuantity = useCallback((productId: Id<"products">, quantity: number) => {
    const safeQty = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;
    const next = readCart().map((row) =>
      row.productId === productId ? { ...row, quantity: safeQty } : row
    );
    writeCart(next);
    setItems(next);
  }, []);

  const removeItem = useCallback((productId: Id<"products">) => {
    const next = readCart().filter((row) => row.productId !== productId);
    writeCart(next);
    setItems(next);
  }, []);

  const clear = useCallback(() => {
    writeCart([]);
    setItems([]);
  }, []);

  return { items, addItem, updateQuantity, removeItem, clear, count: items.reduce((sum, row) => sum + row.quantity, 0) };
}
