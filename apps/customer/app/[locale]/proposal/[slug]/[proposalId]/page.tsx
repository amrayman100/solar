"use client";

import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { ProposalResultView } from "@/components/proposal-views";

export default function ProposalResultPage() {
  const params = useParams<{ slug: string; proposalId: string }>();
  const t = useTranslations("quote");
  const proposal = useQuery(api.proposals.getPublicProposal, {
    proposalId: params.proposalId as Id<"proposals">,
  });
  const [cached, setCached] = useState<unknown>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`proposal-${params.proposalId}`);
    if (raw) {
      try {
        setCached(JSON.parse(raw));
      } catch {
        setCached(null);
      }
    }
  }, [params.proposalId]);

  const details = proposal
    ? (() => {
        try {
          return JSON.parse(proposal.proposalDetailsJson);
        } catch {
          return null;
        }
      })()
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
