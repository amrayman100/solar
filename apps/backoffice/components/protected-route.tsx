"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { authClient } from "@/lib/auth-client";

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center text-(--muted-foreground)">
      Loading...
    </div>
  );
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const session = authClient.useSession();
  const { isAuthenticated, isLoading: convexLoading } = useConvexAuth();
  const ensureProfile = useMutation(api.profiles.ensure);
  const profile = useQuery(api.profiles.me, isAuthenticated ? {} : "skip");
  const [ensureError, setEnsureError] = useState("");

  useEffect(() => {
    if (session.isPending || convexLoading) return;
    if (!session.data) {
      router.replace("/login");
    }
  }, [session.isPending, session.data, convexLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    setEnsureError("");
    void ensureProfile({})
      .catch((err: unknown) => {
        if (cancelled) return;
        setEnsureError(err instanceof Error ? err.message : "Failed to create profile");
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, ensureProfile]);

  if (session.isPending || convexLoading) {
    return <Loading />;
  }

  if (!session.data) {
    return null;
  }

  if (!isAuthenticated || profile === undefined) {
    return <Loading />;
  }

  if (ensureError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-sm text-red-700">{ensureError}</p>
        <button
          type="button"
          className="text-sm text-(--primary) underline"
          onClick={() => router.replace("/login")}
        >
          Back to login
        </button>
      </div>
    );
  }

  if (profile === null) {
    return <Loading />;
  }

  if (profile.role !== "admin" && profile.role !== "staff") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-lg font-semibold text-(--primary)">Staff access required</p>
        <p className="max-w-md text-sm text-(--muted-foreground)">
          Signed in as {profile.email}, but this account is a {profile.role}. Ask an admin to
          upgrade your role, or sign up as the first user on a fresh deployment.
        </p>
        <button
          type="button"
          className="text-sm text-(--primary) underline"
          onClick={() => {
            void authClient.signOut().then(() => router.replace("/login"));
          }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
