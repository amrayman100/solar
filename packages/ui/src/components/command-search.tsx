"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { Search, X } from "lucide-react";
import * as React from "react";

import { cn } from "../lib/utils";

export type CommandShortcut = string | readonly string[];

export type CommandSearchResult = {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  keywords?: readonly string[];
  shortcut?: CommandShortcut;
  disabled?: boolean;
  onSelect?: () => void;
};

export type CommandSearchGroup = {
  id: string;
  heading: string;
  results: readonly CommandSearchResult[];
};

type CommandSearchContextValue = {
  open: boolean;
  setOpen: (_open: boolean) => void;
  toggle: () => void;
};

const CommandSearchContext = React.createContext<CommandSearchContextValue | null>(null);

export function CommandSearchProvider({
  children,
  defaultOpen = false,
}: Readonly<{
  children: React.ReactNode;
  defaultOpen?: boolean;
}>) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = React.useCallback(() => setOpen((current) => !current), []);

  const value = React.useMemo(
    () => ({
      open,
      setOpen,
      toggle,
    }),
    [open, toggle]
  );

  return (
    <CommandSearchContext.Provider value={value}>
      {children}
    </CommandSearchContext.Provider>
  );
}

export function useCommandSearch() {
  const context = React.useContext(CommandSearchContext);
  if (!context) {
    throw new Error("useCommandSearch must be used within CommandSearchProvider");
  }
  return context;
}

export function ShortcutBadge({
  shortcut,
  className,
}: Readonly<{
  shortcut?: CommandShortcut;
  className?: string;
}>) {
  if (!shortcut) return null;

  const keys = Array.isArray(shortcut) ? shortcut : [shortcut];

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((key) => (
        <kbd
          key={key}
          className="min-w-5 rounded border border-(--border) bg-(--muted) px-1.5 py-0.5 text-center text-[10px] font-semibold tracking-wide text-(--muted-foreground)"
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}

export function CommandSearchTrigger({
  label = "Search or run a command",
  shortcut,
  className,
  onClick,
}: Readonly<{
  label?: string;
  shortcut?: CommandShortcut;
  className?: string;
  onClick?: () => void;
}>) {
  const { setOpen } = useCommandSearch();

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        setOpen(true);
      }}
      className={cn(
        "flex h-10 w-full items-center gap-2 rounded-lg border border-(--border) bg-(--background) px-3 text-left text-sm text-(--muted-foreground) shadow-sm transition-colors",
        "hover:bg-(--accent) hover:text-(--accent-foreground)",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2",
        className
      )}
      aria-label={label}
    >
      <Search className="h-4 w-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <ShortcutBadge shortcut={shortcut} />
    </button>
  );
}

export function CommandSearchDialog({
  groups,
  placeholder = "Search…",
  emptyLabel = "No results found.",
  title = "Command search",
  onSelect,
  className,
  searchQuery,
  onSearchQueryChange,
}: Readonly<{
  groups: readonly CommandSearchGroup[];
  placeholder?: string;
  emptyLabel?: string;
  title?: string;
  onSelect?: (_result: CommandSearchResult) => void;
  className?: string;
  /** When set, the filter input is controlled (for debounced server search). */
  searchQuery?: string;
  onSearchQueryChange?: (_query: string) => void;
}>) {
  const { open, setOpen } = useCommandSearch();

  const handleSelect = React.useCallback(
    (result: CommandSearchResult) => {
      result.onSelect?.();
      onSelect?.(result);
      setOpen(false);
    },
    [onSelect, setOpen]
  );

  const hasResults = groups.some((group) => group.results.length > 0);
  const controlledSearch =
    searchQuery !== undefined && onSearchQueryChange !== undefined;
  // When the parent drives a debounced server search, keep cmdk filtering for
  // short queries (pages/actions) and disable it once server results take over.
  const shouldFilter =
    !controlledSearch || (searchQuery?.trim().length ?? 0) < 2;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/60 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-[12vh] z-50 w-[min(calc(100vw-2rem),44rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-(--border) bg-(--popover) text-(--popover-foreground) shadow-2xl",
            "data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className
          )}
        >
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          <Command shouldFilter={shouldFilter}>
            <div className="flex items-center border-b border-(--border) px-4">
              <Search className="mr-3 h-4 w-4 shrink-0 text-(--muted-foreground)" />
              <Command.Input
                placeholder={placeholder}
                {...(controlledSearch
                  ? { value: searchQuery, onValueChange: onSearchQueryChange }
                  : {})}
                className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-(--muted-foreground)"
              />
              <DialogPrimitive.Close className="ml-3 rounded-md p-1 text-(--muted-foreground) transition-colors hover:bg-(--muted) hover:text-(--foreground)">
                <X className="h-4 w-4" />
                <span className="sr-only">Close command search</span>
              </DialogPrimitive.Close>
            </div>

            <Command.List className="max-h-[min(28rem,60vh)] overflow-y-auto p-2">
              <Command.Empty className="px-3 py-8 text-center text-sm text-(--muted-foreground)">
                {emptyLabel}
              </Command.Empty>
              {hasResults
                ? groups.map((group) => (
                    <Command.Group
                      key={group.id}
                      heading={group.heading}
                      className="pb-2 text-xs font-semibold tracking-wide text-(--muted-foreground) [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2"
                    >
                      {group.results.map((result) => (
                        <Command.Item
                          key={result.id}
                          value={`${result.title} ${result.description ?? ""} ${
                            result.keywords?.join(" ") ?? ""
                          }`}
                          disabled={result.disabled}
                          onSelect={() => handleSelect(result)}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-(--foreground) outline-none transition-colors",
                            "aria-selected:bg-(--accent) aria-selected:text-(--accent-foreground)",
                            "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                          )}
                        >
                          {result.icon ? (
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--muted) text-(--muted-foreground)">
                              {result.icon}
                            </span>
                          ) : null}
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium">{result.title}</span>
                            {result.description ? (
                              <span className="block truncate text-xs text-(--muted-foreground)">
                                {result.description}
                              </span>
                            ) : null}
                          </span>
                          <ShortcutBadge shortcut={result.shortcut} />
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))
                : null}
            </Command.List>
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
