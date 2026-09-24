"use client";

import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { ProposalResultView } from "@/components/proposal-views";

function parseStoredProposal(raw: string): unknown {
  let value: unknown = raw;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    if (typeof value !== "string") return value;
    try {
      value = JSON.parse(value);
    } catch {
      return null;
    }
  }
  return value;
}

export default function ProposalResultPage() {
  const params = useParams<{ slug: string; proposalId: string }>();
  const t = useTranslations("quote");
  const proposal = useQuery(api.proposals.getPublicProposal, {
    proposalId: params.proposalId as Id<"proposals">,
  });
  const [cached, setCached] = useState<unknown>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`proposal-${params.proposalId}`);
    if (raw) setCached(parseStoredProposal(raw));
  }, [params.proposalId]);

  const details = proposal
    ? parseStoredProposal(proposal.proposalDetailsJson)
    : cached;

  if (proposal === undefined && cached === null) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <p className="text-sm text-(--muted-foreground)">Loading…</p>
      </main>
    );
  }

  if (!details) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold text-(--primary)">{t("result")}</h1>
        <p className="mt-6 text-sm text-(--muted-foreground)">{t("proposalNotFound")}</p>
      </main>
    );
  }

  return (
    <main className="w-full">
      <ProposalResultView slug={params.slug} proposal={details} />
    </main>
  );
}
