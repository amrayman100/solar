"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { formatDate } from "@/lib/format";
import { useStaffQueryArgs } from "@/lib/use-staff-query-args";
import {
  ProposalContactLinks,
  ProposalDetailView,
} from "@/components/proposal-detail-view";

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
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-(--primary)">{proposal.customerName}</h1>
            <p className="mt-1 text-sm text-(--muted-foreground)">
              {proposal.solutionSlug}
              {proposal.city ? ` · ${proposal.city}` : ""}
              {" · "}
              {formatDate(proposal.createdAt)}
              {proposal.legacyId !== undefined ? ` · legacy #${proposal.legacyId}` : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-(--secondary) px-3 py-1 text-xs font-semibold uppercase tracking-wide text-(--foreground)">
              {proposal.solutionSlug}
            </span>
            {proposal.isInterested ? (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                Interested
              </span>
            ) : null}
          </div>
        </div>
        <ProposalContactLinks phoneNumber={proposal.phoneNumber} email={proposal.email} />
        {proposal.latitude !== undefined && proposal.longitude !== undefined ? (
          <p className="text-xs text-(--muted-foreground)">
            Location: {proposal.latitude.toFixed(5)}, {proposal.longitude.toFixed(5)}{" "}
            <a
              className="text-(--primary) hover:underline"
              href={`https://www.google.com/maps?q=${proposal.latitude},${proposal.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open map
            </a>
          </p>
        ) : null}
      </header>

      <ProposalDetailView
        solutionSlug={proposal.solutionSlug}
        proposalDetailsJson={proposal.proposalDetailsJson}
      />
    </main>
  );
}
