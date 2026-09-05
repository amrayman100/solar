"use client";

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { ConvexReactClient } from "convex/react";
import { authClient } from "@/lib/auth-client";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClientProvider({
  children,
  initialToken,
}: {
  children: React.ReactNode;
  initialToken?: string | null;
}) {
  if (!convex) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--background)">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-(--primary)">
            Convex not configured
          </h1>
          <p className="text-sm text-(--muted-foreground)">
            Set NEXT_PUBLIC_CONVEX_URL and run `npx convex dev`.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ConvexBetterAuthProvider
      client={convex}
      authClient={authClient}
      initialToken={initialToken}
    >
      {children}
    </ConvexBetterAuthProvider>
  );
}
