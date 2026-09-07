"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { GridTiedSimulator } from "@/components/simulator/grid-tied-simulator";

export default function GridTiedSettingsPage() {
  const solution = useQuery(api.proposals.getSolution, { slug: "grid-tied" });

  return (
    <main className="mx-auto max-w-7xl space-y-4 px-6 py-10">
      <Link href="/settings" className="text-sm text-(--muted-foreground) underline-offset-4 hover:underline">
        ← Settings
      </Link>
      {solution === undefined ? (
        <p className="text-sm text-(--muted-foreground)">Loading grid-tied settings…</p>
      ) : solution === null ? (
        <p className="text-sm text-red-700">
          No grid-tied solution found. Seed calculators via{" "}
          <code className="rounded bg-(--muted) px-1">npx convex run seed:seedSolutions</code>.
        </p>
      ) : (
        <GridTiedSimulator
          solution={{
            name: solution.name,
            currency: solution.currency,
            isEnabled: solution.isEnabled,
            parametersJson: solution.parametersJson,
          }}
        />
      )}
    </main>
  );
}
