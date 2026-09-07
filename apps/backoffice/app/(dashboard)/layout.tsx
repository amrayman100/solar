"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { Navigation } from "@/components/navigation";
import { BackofficeShortcuts } from "@/components/backoffice-shortcuts";
import { CommandSearchProvider } from "@bolt-energy/ui/components/command-search";
import { ShortcutProvider } from "@bolt-energy/ui/components/shortcuts";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <CommandSearchProvider>
        <ShortcutProvider>
          <BackofficeShortcuts />
          <Navigation />
          <div className="min-h-screen xl:pl-64">{children}</div>
        </ShortcutProvider>
      </CommandSearchProvider>
    </ProtectedRoute>
  );
}
