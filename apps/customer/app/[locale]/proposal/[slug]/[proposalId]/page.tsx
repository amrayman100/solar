"use client";

import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

export default function ProposalResultPage() {
  const params = useParams<{ slug: string; proposalId: string }>();
  const t = useTranslations("quote");
  const proposal = useQuery(api.proposals.getPublicProposal, {
    proposalId: params.proposalId as Id<"proposals">,
  });
  const [cached, setCached] = useState<unknown>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`proposal-${params.proposalId}`);
    if (raw) setCached(JSON.parse(raw));
  }, [params.proposalId]);

  const details = proposal
    ? JSON.parse(proposal.proposalDetailsJson)
    : cached;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-(--primary)">{t("result")}</h1>
      {details ? (
        <pre className="mt-6 overflow-x-auto rounded-xl border border-(--border) bg-(--secondary) p-4 text-sm">
          {JSON.stringify(details, null, 2)}
        </pre>
      ) : (
        <p className="mt-6 text-sm text-(--muted-foreground)">Loading…</p>
      )}
    </main>
  );
}
