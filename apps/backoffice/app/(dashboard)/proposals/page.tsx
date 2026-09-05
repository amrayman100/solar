"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Select } from "@bolt-energy/ui/components/inputs";
import { formatDate } from "@/lib/format";
import { useStaffQueryArgs } from "@/lib/use-staff-query-args";

export default function ProposalsPage() {
  const staffArgs = useStaffQueryArgs();
  const [slug, setSlug] = useState("all");
  const solutions = useQuery(api.proposals.listSolutions);
  const proposals = useQuery(
    api.proposals.listProposals,
    staffArgs === "skip" ? "skip" : slug === "all" ? {} : { solutionSlug: slug }
  );

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-bold text-(--primary)">Proposals</h1>
      <Select value={slug} onChange={(event) => setSlug(event.target.value)}>
        <option value="all">All solutions</option>
        {solutions?.map((solution) => (
          <option key={solution._id} value={solution.slug}>
            {solution.name}
          </option>
        ))}
      </Select>
      {proposals === undefined ? (
        <p>Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-(--border)">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-(--secondary)">
              <tr>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Solution</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">City</th>
                <th className="px-3 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal) => (
                <tr key={proposal._id} className="border-t border-(--border)">
                  <td className="px-3 py-2">
                    <Link href={`/proposals/${proposal._id}`} className="font-semibold text-(--primary)">
                      {proposal.customerName}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{proposal.solutionSlug}</td>
                  <td className="px-3 py-2">{proposal.phoneNumber}</td>
                  <td className="px-3 py-2">{proposal.city ?? "—"}</td>
                  <td className="px-3 py-2">{formatDate(proposal.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
