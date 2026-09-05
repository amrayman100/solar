"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export default function SettingsPage() {
  const solutions = useQuery(api.proposals.listSolutions);

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold text-(--primary)">Settings</h1>
        <p className="mt-1 text-sm text-(--muted-foreground)">
          Calculator simulators and configuration.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-(--foreground)">Simulators</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/settings/grid-tied"
            className="rounded-xl border border-(--border) bg-(--card) p-5 transition-colors hover:border-(--primary)"
          >
            <p className="text-lg font-semibold text-(--primary)">Grid-tied</p>
            <p className="mt-1 text-sm text-(--muted-foreground)">
              Edit panel, inverters, cables, billing — and simulate monthly consumption.
            </p>
          </Link>
          <Link
            href="/settings/off-grid"
            className="rounded-xl border border-(--border) bg-(--card) p-5 transition-colors hover:border-(--primary)"
          >
            <p className="text-lg font-semibold text-(--primary)">Off-grid</p>
            <p className="mt-1 text-sm text-(--muted-foreground)">
              Edit battery, inverters, load templates — and simulate device loads.
            </p>
          </Link>
        </div>
        {solutions === undefined ? (
          <p className="text-sm text-(--muted-foreground)">Loading solutions…</p>
        ) : solutions.length === 0 ? (
          <p className="text-sm text-(--muted-foreground)">
            No calculator solutions found yet.
          </p>
        ) : (
          <p className="text-sm text-(--muted-foreground)">
            Loaded solutions: {solutions.map((s) => s.slug).join(", ")}
          </p>
        )}
      </section>
    </main>
  );
}
