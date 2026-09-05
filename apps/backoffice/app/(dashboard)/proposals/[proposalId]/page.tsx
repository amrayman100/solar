"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { formatDate, prettyJson } from "@/lib/format";
import { useStaffQueryArgs } from "@/lib/use-staff-query-args";

export default function ProposalDetailPage() {
  const params = useParams<{ proposalId: string }>();
  const staffArgs = useStaffQueryArgs();
  const proposal = useQuery(
    api.proposals.getProposal,
    staffArgs === "skip"
      ? "skip"
      : { proposalId: params.proposalId as Id<"proposals"> }
  );

  if (proposal === undefined) return <main className="px-6 py-10">Loading…</main>;
  if (!proposal) return <main className="px-6 py-10">Not found</main>;

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-6 py-10">
      <h1 className="text-3xl font-bold text-(--primary)">{proposal.customerName}</h1>
      <p className="text-sm text-(--muted-foreground)">
        {proposal.solutionSlug} · {proposal.phoneNumber} · {proposal.email ?? "no email"} ·{" "}
        {proposal.city ?? "no city"} · {formatDate(proposal.createdAt)}
      </p>
      <pre className="overflow-x-auto rounded-xl border border-(--border) bg-(--secondary) p-4 text-xs">
        {prettyJson(proposal.proposalDetailsJson)}
      </pre>
    </main>
  );
}
