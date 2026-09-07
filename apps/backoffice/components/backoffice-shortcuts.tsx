"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCommandSearch } from "@bolt-energy/ui/components/command-search";
import { useShortcut } from "@bolt-energy/ui/components/shortcuts";
import {
  backofficeNavItems,
  type BackofficeNavItem,
} from "@/components/backoffice-nav-items";

function BackofficePageShortcut({
  item,
}: Readonly<{ item: BackofficeNavItem }>) {
  const router = useRouter();

  useShortcut(
    useMemo(
      () => ({
        id: `backoffice:navigate:${item.href}`,
        keys: item.shortcut ?? "",
        description: `Go to ${item.label}`,
        disabled: !item.shortcut,
        onKeyDown: () => router.push(item.href),
      }),
      [item.href, item.label, item.shortcut, router]
    )
  );

  return null;
}

export function BackofficeShortcuts() {
  const commandSearch = useCommandSearch();

  useShortcut(
    useMemo(
      () => ({
        id: "backoffice:open-command-search",
        keys: "mod+k",
        description: "Open command search",
        onKeyDown: () => commandSearch.setOpen(true),
        ignoreEditable: false,
      }),
      [commandSearch]
    )
  );

  return (
    <>
      {backofficeNavItems.map((item) => (
        <BackofficePageShortcut key={item.href} item={item} />
      ))}
    </>
  );
}
