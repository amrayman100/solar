"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import {
  AppSidebarContent,
  AppSidebarFooter,
  AppSidebarFrame,
  AppSidebarHeader,
  AppSidebarItem,
  AppSidebarMobileToggle,
  AppSidebarNav,
  AppSidebarOverlay,
  AppSidebarSection,
} from "@bolt-energy/ui/components/app-sidebar";
import { Button } from "@bolt-energy/ui/components/button";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useStaffQueryArgs } from "@/lib/use-staff-query-args";
import { BackofficeCommandSearch } from "@/components/backoffice-command-search";
import { backofficeNavItems } from "@/components/backoffice-nav-items";

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const staffArgs = useStaffQueryArgs();
  const profile = useQuery(api.profiles.me, staffArgs);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function signOut() {
    await authClient.signOut();
    router.replace("/login");
  }

  return (
    <>
      <AppSidebarMobileToggle
        open={mobileOpen}
        onToggle={() => setMobileOpen((open) => !open)}
      />
      <AppSidebarOverlay open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <AppSidebarFrame expanded mobileOpen={mobileOpen}>
        <AppSidebarContent>
          <AppSidebarHeader expanded>
            <p className="text-xs font-semibold tracking-wide text-(--sidebar-foreground)/60">
              BOLT ENERGY
            </p>
            <p className="mt-1 text-lg font-bold text-(--sidebar-foreground)">
              Backoffice
            </p>
            <div className="mt-4">
              <BackofficeCommandSearch
                onLogout={() => void signOut()}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>
          </AppSidebarHeader>
          <AppSidebarNav>
            <AppSidebarSection expanded>
              {backofficeNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <AppSidebarItem
                    key={item.href}
                    expanded
                    active={isActivePath(pathname, item.href)}
                    icon={<Icon className="h-5 w-5" />}
                    label={item.label}
                    shortcut={item.shortcut}
                    onClick={() => {
                      router.push(item.href);
                      setMobileOpen(false);
                    }}
                  />
                );
              })}
            </AppSidebarSection>
          </AppSidebarNav>
          <AppSidebarFooter expanded>
            {profile === undefined ? (
              <p className="text-xs text-(--sidebar-foreground)/60">Loading profile…</p>
            ) : profile === null ? (
              <p className="text-xs text-(--sidebar-foreground)/60">
                No staff profile yet
              </p>
            ) : (
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-(--sidebar-foreground)">
                  {profile.email}
                </p>
                <p className="text-xs capitalize text-(--sidebar-foreground)/60">
                  {profile.role}
                </p>
              </div>
            )}
            <Button
              type="button"
              onClick={() => void signOut()}
              className="w-full gap-2 bg-(--sidebar-accent) text-(--sidebar-accent-foreground) hover:opacity-90"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </AppSidebarFooter>
        </AppSidebarContent>
      </AppSidebarFrame>
    </>
  );
}
