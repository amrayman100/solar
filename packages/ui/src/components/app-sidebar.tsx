"use client";

import { Menu, X } from "lucide-react";
import * as React from "react";

import { cn } from "../lib/utils";
import { ShortcutBadge, type CommandShortcut } from "./command-search";

export function AppSidebarMobileToggle({
  open,
  onToggle,
  className,
}: Readonly<{
  open: boolean;
  onToggle: () => void;
  className?: string;
}>) {
  return (
    <div className={cn("fixed left-4 top-4 z-50 xl:hidden", className)}>
      <button
        type="button"
        onClick={onToggle}
        className="rounded-md bg-(--background) p-2 text-(--muted-foreground) shadow-md transition-colors hover:bg-(--muted) hover:text-(--foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );
}

export function AppSidebarOverlay({
  open,
  onClose,
}: Readonly<{
  open: boolean;
  onClose: () => void;
}>) {
  if (!open) return null;

  return (
    <button
      type="button"
      className="fixed inset-0 z-30 bg-black/50 xl:hidden"
      onClick={onClose}
      aria-label="Close menu"
    />
  );
}

export function AppSidebarFrame({
  expanded,
  mobileOpen,
  children,
  className,
}: Readonly<{
  expanded: boolean;
  mobileOpen: boolean;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-full transform bg-(--sidebar) text-(--sidebar-foreground) shadow-lg transition-[transform,width] duration-300 ease-in-out",
        mobileOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full",
        "xl:translate-x-0",
        expanded ? "xl:w-64" : "xl:w-16",
        className
      )}
    >
      {children}
    </aside>
  );
}

export function AppSidebarContent({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={cn("flex h-full w-64 min-w-0 flex-col xl:w-full", className)}>
      {children}
    </div>
  );
}

export function AppSidebarHeader({
  expanded,
  children,
  className,
}: Readonly<{
  expanded: boolean;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "shrink-0 border-b border-(--sidebar-border)",
        expanded ? "p-6" : "p-3 xl:px-3 xl:py-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AppSidebarNav({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <nav className={cn("flex-1 space-y-1 overflow-y-auto px-4 py-6 xl:px-3", className)}>
      {children}
    </nav>
  );
}

export function AppSidebarSection({
  title,
  expanded,
  children,
  className,
}: Readonly<{
  title?: string;
  expanded: boolean;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={cn("space-y-1", className)}>
      {title && expanded ? (
        <p className="px-3 pb-1 text-[11px] font-semibold tracking-wide text-(--sidebar-foreground)/50">
          {title}
        </p>
      ) : null}
      {children}
    </div>
  );
}

export function appSidebarItemClass({
  active = false,
  expanded = true,
  className,
}: {
  active?: boolean;
  expanded?: boolean;
  className?: string;
}) {
  return cn(
    "flex w-full items-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--sidebar-ring)",
    expanded ? "gap-3 px-3 py-2.5" : "xl:justify-center xl:px-0 xl:py-2.5",
    active
      ? "bg-(--sidebar-accent) text-(--sidebar-accent-foreground)"
      : "text-(--sidebar-foreground)/70 hover:bg-(--sidebar-accent) hover:text-(--sidebar-accent-foreground)",
    className
  );
}

export function AppSidebarItem({
  active = false,
  expanded,
  icon,
  label,
  shortcut,
  onClick,
  title,
  ariaLabel,
  className,
}: Readonly<{
  active?: boolean;
  expanded: boolean;
  icon?: React.ReactNode;
  label: string;
  shortcut?: CommandShortcut;
  onClick?: () => void;
  title?: string;
  ariaLabel?: string;
  className?: string;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title ?? (!expanded ? label : undefined)}
      aria-label={ariaLabel}
      className={appSidebarItemClass({ active, expanded, className })}
    >
      {icon ? <span className="h-5 w-5 shrink-0">{icon}</span> : null}
      {expanded ? <span className="min-w-0 flex-1 truncate text-left">{label}</span> : null}
      {expanded ? <ShortcutBadge shortcut={shortcut} /> : null}
    </button>
  );
}

export function AppSidebarFooter({
  expanded,
  children,
  className,
}: Readonly<{
  expanded: boolean;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "shrink-0 border-t border-(--sidebar-border)",
        expanded ? "space-y-3 p-4" : "p-3 xl:space-y-2",
        className
      )}
    >
      {children}
    </div>
  );
}
