"use client";

import { useRouter } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import {
  FileText,
  LogOut,
  Package,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api } from "@convex/_generated/api";
import {
  CommandSearchDialog,
  CommandSearchTrigger,
  useCommandSearch,
  type CommandSearchGroup,
} from "@bolt-energy/ui/components/command-search";
import { backofficeNavItems } from "@/components/backoffice-nav-items";

type BackofficeCommandSearchProps = {
  onLogout: () => void;
  onNavigate?: () => void;
};

function useDebouncedValue(value: string, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

export function BackofficeCommandSearch({
  onLogout,
  onNavigate,
}: BackofficeCommandSearchProps) {
  const router = useRouter();
  const { open, setOpen } = useCommandSearch();
  const { isAuthenticated, isLoading } = useConvexAuth();

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (!open) setSearchQuery("");
  }, [open]);

  const debouncedSearch = useDebouncedValue(searchQuery, 280);
  const trimmedDebounced = debouncedSearch.trim();

  const paletteData = useQuery(
    api.commandSearch.paletteSearch,
    !isLoading && isAuthenticated && trimmedDebounced.length >= 2
      ? { query: trimmedDebounced }
      : "skip"
  );

  const staticGroups = useMemo((): CommandSearchGroup[] => {
    return [
      {
        id: "pages",
        heading: "Pages",
        results: backofficeNavItems.map((item) => {
          const Icon = item.icon;
          return {
            id: `page:${item.href}`,
            title: item.label,
            description: item.description,
            href: item.href,
            keywords: item.keywords,
            shortcut: item.shortcut,
            icon: <Icon className="h-4 w-4" />,
          };
        }),
      },
      {
        id: "actions",
        heading: "Actions",
        results: [
          {
            id: "action:logout",
            title: "Log out",
            description: "End the current backoffice session",
            icon: <LogOut className="h-4 w-4" />,
            onSelect: onLogout,
            keywords: ["sign out", "session"],
          },
        ],
      },
    ];
  }, [onLogout]);

  const groups = useMemo(() => {
    if (trimmedDebounced.length < 2 || !paletteData) {
      return staticGroups;
    }

    const extra: CommandSearchGroup[] = [];

    if (paletteData.orders.length > 0) {
      extra.push({
        id: "orders",
        heading: "Orders",
        results: paletteData.orders.map((o) => ({
          id: `order:${o.id}`,
          title: o.title,
          description: o.description,
          href: o.href,
          keywords: [...o.keywords],
          icon: <ShoppingCart className="h-4 w-4" />,
        })),
      });
    }

    if (paletteData.proposals.length > 0) {
      extra.push({
        id: "proposals",
        heading: "Proposals",
        results: paletteData.proposals.map((p) => ({
          id: `proposal:${p.id}`,
          title: p.title,
          description: p.description,
          href: p.href,
          keywords: [...p.keywords],
          icon: <FileText className="h-4 w-4" />,
        })),
      });
    }

    if (paletteData.products.length > 0) {
      extra.push({
        id: "products",
        heading: "Products",
        results: paletteData.products.map((p) => ({
          id: `product:${p.id}`,
          title: p.title,
          description: p.description,
          href: p.href,
          keywords: [...p.keywords],
          icon: <Package className="h-4 w-4" />,
        })),
      });
    }

    if (paletteData.leads.length > 0) {
      extra.push({
        id: "leads",
        heading: "Leads",
        results: paletteData.leads.map((l) => ({
          id: `lead:${l.id}`,
          title: l.title,
          description: l.description,
          href: l.href,
          keywords: [...l.keywords],
          icon: <Users className="h-4 w-4" />,
        })),
      });
    }

    return [...staticGroups, ...extra];
  }, [staticGroups, paletteData, trimmedDebounced]);

  return (
    <>
      <CommandSearchTrigger
        label="Quick find"
        shortcut="Mod+K"
        className="border-(--sidebar-border) bg-(--sidebar-accent)/40 text-(--sidebar-foreground)/80 shadow-none hover:bg-(--sidebar-accent) hover:text-(--sidebar-accent-foreground) focus-visible:ring-(--sidebar-ring) focus-visible:ring-offset-0"
      />
      <CommandSearchDialog
        groups={groups}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        placeholder="Find orders, proposals, products, or a page…"
        onSelect={(result) => {
          if (result.href) {
            router.push(result.href);
            onNavigate?.();
          }
          setOpen(false);
        }}
      />
    </>
  );
}

/** Compact icon-only trigger for tight layouts (kept for parity with Kamal Bake). */
export function BackofficeCommandSearchIconButton({
  onClick,
}: {
  onClick?: () => void;
}) {
  const { setOpen } = useCommandSearch();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        setOpen(true);
      }}
      className="flex h-9 w-full items-center justify-center rounded-lg text-(--sidebar-foreground)/70 transition-colors hover:bg-(--sidebar-accent) hover:text-(--sidebar-accent-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--sidebar-ring)"
      aria-label="Open quick search"
      title="Quick search — Mod+K"
    >
      <Search className="h-5 w-5" />
    </button>
  );
}
