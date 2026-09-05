"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { formatDate } from "@/lib/format";
import { useStaffQueryArgs } from "@/lib/use-staff-query-args";

export default function LeadsPage() {
  const staffArgs = useStaffQueryArgs();
  const contacts = useQuery(api.leads.listContacts, staffArgs);
  const ambassadors = useQuery(api.leads.listAmbassadors, staffArgs);

  return (
    <main className="mx-auto max-w-6xl space-y-10 px-6 py-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold text-(--primary)">Contacts</h1>
        {contacts === undefined ? (
          <p>Loading…</p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="bg-(--secondary)">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Message</th>
                <th className="px-3 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((row) => (
                <tr key={row._id} className="border-t border-(--border)">
                  <td className="px-3 py-2">{row.name}</td>
                  <td className="px-3 py-2">{row.phoneNumber}</td>
                  <td className="px-3 py-2">{row.type ?? "—"}</td>
                  <td className="px-3 py-2">{row.message ?? "—"}</td>
                  <td className="px-3 py-2">{formatDate(row.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-(--primary)">Brand ambassadors</h2>
        {ambassadors === undefined ? (
          <p>Loading…</p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead className="bg-(--secondary)">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {ambassadors.map((row) => (
                <tr key={row._id} className="border-t border-(--border)">
                  <td className="px-3 py-2">{row.name}</td>
                  <td className="px-3 py-2">{row.phoneNumber}</td>
                  <td className="px-3 py-2">{row.email ?? "—"}</td>
                  <td className="px-3 py-2">{formatDate(row.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
