"use client";

import * as React from "react";

export type ShortcutDefinition = {
  id: string;
  keys: string;
  description: string;
  onKeyDown: (_event: KeyboardEvent) => void;
  disabled?: boolean;
  preventDefault?: boolean;
  ignoreEditable?: boolean;
};

type ShortcutContextValue = {
  register: (_shortcut: ShortcutDefinition) => () => void;
};

const ShortcutContext = React.createContext<ShortcutContextValue | null>(null);

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tagName = target.tagName.toLowerCase();
  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  );
}

function normalizeKey(key: string) {
  if (key === " ") return "space";
  return key.toLowerCase();
}

function matchesShortcut(event: KeyboardEvent, shortcut: string) {
  const parts = shortcut
    .toLowerCase()
    .split("+")
    .map((part) => part.trim())
    .filter(Boolean);
  const expectedKey = parts[parts.length - 1];
  const wantsMod = parts.includes("mod");
  const wantsCtrl = parts.includes("ctrl");
  const wantsMeta = parts.includes("meta");
  const wantsShift = parts.includes("shift");
  const wantsAlt = parts.includes("alt");

  if (!expectedKey) return false;
  if (wantsMod && !(event.metaKey || event.ctrlKey)) return false;
  if (!wantsMod && wantsCtrl !== event.ctrlKey) return false;
  if (!wantsMod && wantsMeta !== event.metaKey) return false;
  if (wantsShift !== event.shiftKey) return false;
  if (wantsAlt !== event.altKey) return false;

  return normalizeKey(event.key) === expectedKey;
}

export function ShortcutProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const shortcutsRef = React.useRef(new Map<string, ShortcutDefinition>());

  const register = React.useCallback((shortcut: ShortcutDefinition) => {
    shortcutsRef.current.set(shortcut.id, shortcut);
    return () => {
      shortcutsRef.current.delete(shortcut.id);
    };
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcutsRef.current.values()) {
        if (shortcut.disabled) continue;
        if (shortcut.ignoreEditable !== false && isEditableTarget(event.target)) continue;
        if (!matchesShortcut(event, shortcut.keys)) continue;

        if (shortcut.preventDefault !== false) {
          event.preventDefault();
        }
        shortcut.onKeyDown(event);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const value = React.useMemo(() => ({ register }), [register]);

  return <ShortcutContext.Provider value={value}>{children}</ShortcutContext.Provider>;
}

export function useShortcut(shortcut: ShortcutDefinition) {
  const context = React.useContext(ShortcutContext);
  if (!context) {
    throw new Error("useShortcut must be used within ShortcutProvider");
  }

  React.useEffect(() => context.register(shortcut), [context, shortcut]);
}
