"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Info } from "lucide-react";
import { api } from "@convex/_generated/api";
import { Button } from "@bolt-energy/ui/components/button";
import { Input, Select } from "@bolt-energy/ui/components/inputs";
import { formatMoney } from "@/lib/format";
import { useStaffQueryArgs } from "@/lib/use-staff-query-args";

type Granularity = "day" | "week" | "month";

function startOfLocalDay(d: Date): number {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

function endOfLocalDay(d: Date): number {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x.getTime();
}

function formatDateInput(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseDateInput(s: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date(y!, m! - 1, d!);
  if (dt.getFullYear() !== y || dt.getMonth() !== m! - 1 || dt.getDate() !== d) {
    return null;
  }
  return dt;
}

export default function ReportsPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-7xl space-y-6 px-6 py-10">
          <h1 className="text-3xl font-bold text-(--primary)">Reports & insights</h1>
          <div className="h-48 animate-pulse rounded-xl bg-(--muted)" />
        </main>
      }
    >
      <ReportsContent />
    </Suspense>
  );
}

function ReportsContent() {
  const searchParams = useSearchParams();
  const staffArgs = useStaffQueryArgs();

  const [startMs, setStartMs] = useState(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 29);
    return startOfLocalDay(start);
  });
  const [endMs, setEndMs] = useState(() => endOfLocalDay(new Date()));
  const [startDateStr, setStartDateStr] = useState(() =>
    formatDateInput(new Date(startMs))
  );
  const [endDateStr, setEndDateStr] = useState(() =>
    formatDateInput(new Date(endMs))
  );
  const [trendGranularity, setTrendGranularity] = useState<Granularity>("week");
  const [sortBy, setSortBy] = useState<"quantity" | "revenue">("quantity");

  const applyPreset = useCallback((key: string) => {
    const end = new Date();
    let start: Date;
    if (key === "7d") {
      start = new Date();
      start.setDate(end.getDate() - 6);
    } else if (key === "30d") {
      start = new Date();
      start.setDate(end.getDate() - 29);
    } else if (key === "month") {
      start = new Date(end.getFullYear(), end.getMonth(), 1);
    } else {
      return;
    }
    const s = startOfLocalDay(start);
    const e = endOfLocalDay(end);
    setStartMs(s);
    setEndMs(e);
    setStartDateStr(formatDateInput(new Date(s)));
    setEndDateStr(formatDateInput(new Date(e)));
  }, []);

  const urlPreset = searchParams.get("preset");
  useEffect(() => {
    if (urlPreset === "7d" || urlPreset === "30d" || urlPreset === "month") {
      applyPreset(urlPreset);
    }
  }, [urlPreset, applyPreset]);

  const insights = useQuery(
    api.reports.getInsights,
    staffArgs === "skip" || startMs > endMs
      ? "skip"
      : {
          startMs,
          endMs,
          trendGranularity,
          sortBy,
          topProductsLimit: 10,
        }
  );

  const chartData = useMemo(() => {
    if (!insights?.trendSeries) return [];
    return insights.trendSeries.map((row) => ({
      label: row.label,
      revenue: Math.round(row.revenue * 100) / 100,
      orders: row.orderCount,
      proposals: row.proposalCount,
    }));
  }, [insights]);

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-10">
      <div>
        <p className="text-sm font-semibold tracking-wide text-(--primary)">BOLT ENERGY</p>
        <h1 className="text-3xl font-bold text-(--primary)">Reports & insights</h1>
        <p className="mt-1 text-sm text-(--muted-foreground)">
          Shop revenue, proposals, and catalogue performance by created date.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50/80 px-3 py-2 text-sm text-emerald-950">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
        <p>
          Totals use each record&apos;s <strong>created at</strong> time. Cancelled
          shop orders are excluded from revenue.
        </p>
      </div>

      <section className="space-y-4 rounded-xl border border-(--border) bg-(--card) p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-(--foreground)">Date range</h2>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["7d", "Last 7 days"],
              ["30d", "Last 30 days"],
              ["month", "This month"],
            ] as const
          ).map(([key, label]) => (
            <Button
              key={key}
              type="button"
              className="border-2 border-emerald-200 bg-white text-emerald-900 shadow-sm hover:border-emerald-400 hover:bg-emerald-50"
              onClick={() => applyPreset(key)}
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="grid max-w-md gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-(--foreground)">Start</label>
            <Input
              type="date"
              value={startDateStr}
              onChange={(e) => {
                setStartDateStr(e.target.value);
                const t = parseDateInput(e.target.value);
                if (t !== null) setStartMs(startOfLocalDay(t));
              }}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-(--foreground)">End</label>
            <Input
              type="date"
              value={endDateStr}
              onChange={(e) => {
                setEndDateStr(e.target.value);
                const t = parseDateInput(e.target.value);
                if (t !== null) setEndMs(endOfLocalDay(t));
              }}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-(--border) bg-(--card) p-6 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-lg font-semibold text-(--foreground)">Trend chart</h2>
          <div>
            <label className="mb-1 block text-sm font-medium text-(--foreground)">
              Bucket size
            </label>
            <Select
              value={trendGranularity}
              onChange={(e) => setTrendGranularity(e.target.value as Granularity)}
            >
              <option value="day">Daily</option>
              <option value="week">Weekly (default)</option>
              <option value="month">Monthly</option>
            </Select>
          </div>
        </div>
        {!insights ? (
          <div className="flex h-72 items-center justify-center text-sm text-(--muted-foreground)">
            Loading…
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-sm text-(--muted-foreground)">
            No data in this range.
          </div>
        ) : (
          <div className="h-80 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 48 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#4b5563" }}
                  interval={0}
                  angle={-32}
                  textAnchor="end"
                  height={56}
                />
                <YAxis tick={{ fontSize: 11, fill: "#4b5563" }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const row = payload[0]!.payload as {
                      label: string;
                      revenue: number;
                      orders: number;
                      proposals: number;
                    };
                    return (
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm shadow-sm">
                        <p className="mb-1 font-semibold text-(--foreground)">{label}</p>
                        <p className="text-emerald-900">
                          Revenue:{" "}
                          <span className="font-medium tabular-nums">
                            {formatMoney(row.revenue)}
                          </span>
                        </p>
                        <p className="text-(--foreground)">
                          Orders:{" "}
                          <span className="font-medium tabular-nums">{row.orders}</span>
                        </p>
                        <p className="text-(--foreground)">
                          Proposals:{" "}
                          <span className="font-medium tabular-nums">{row.proposals}</span>
                        </p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="revenue" name="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {insights ? (
        <>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <SummaryCard
              label="Orders"
              value={String(insights.summary.orderCount)}
              gradient="from-emerald-500 to-emerald-600"
            />
            <SummaryCard
              label="Revenue"
              value={formatMoney(insights.summary.totalRevenue)}
              gradient="from-teal-500 to-teal-600"
            />
            <SummaryCard
              label="Avg order"
              value={formatMoney(insights.summary.averageOrderValue)}
              gradient="from-green-500 to-green-600"
            />
            <SummaryCard
              label="Proposals"
              value={String(insights.summary.proposalCount)}
              gradient="from-lime-500 to-green-600"
            />
            <SummaryCard
              label="Leads"
              value={String(insights.summary.leadCount)}
              gradient="from-cyan-500 to-teal-600"
            />
          </section>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-(--border) bg-(--card) p-6 shadow-sm">
              <h3 className="mb-3 text-base font-semibold text-(--foreground)">
                Payment status
              </h3>
              <ul className="space-y-2 text-sm">
                {(
                  [
                    ["Paid", insights.paymentStatusBreakdown.paid],
                    ["Partial", insights.paymentStatusBreakdown.partial],
                    ["Unpaid", insights.paymentStatusBreakdown.unpaid],
                  ] as const
                ).map(([label, row]) => (
                  <li key={label} className="flex justify-between gap-3">
                    <span className="text-(--muted-foreground)">{label}</span>
                    <span className="font-medium tabular-nums">
                      {row.orders} · {formatMoney(row.revenue)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-(--border) bg-(--card) p-6 shadow-sm">
              <h3 className="mb-3 text-base font-semibold text-(--foreground)">
                Order status
              </h3>
              <ul className="space-y-2 text-sm">
                {(
                  [
                    ["New", insights.orderStatusBreakdown.new],
                    ["Quoted", insights.orderStatusBreakdown.quoted],
                    ["Confirmed", insights.orderStatusBreakdown.confirmed],
                    ["Fulfilled", insights.orderStatusBreakdown.fulfilled],
                    ["Cancelled", insights.orderStatusBreakdown.cancelled],
                  ] as const
                ).map(([label, row]) => (
                  <li key={label} className="flex justify-between gap-3">
                    <span className="text-(--muted-foreground)">{label}</span>
                    <span className="font-medium tabular-nums">
                      {row.orders} · {formatMoney(row.revenue)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-xl border border-(--border) bg-(--card) p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-(--foreground)">
                Proposals by solution
              </h3>
              <Link
                href="/proposals"
                className="text-xs font-medium text-(--primary) hover:underline"
              >
                View proposals
              </Link>
            </div>
            {insights.proposalsBySolution.length === 0 ? (
              <p className="text-sm text-(--muted-foreground)">No proposals in this range.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-(--border) text-left text-(--muted-foreground)">
                      <th className="pb-2 pr-3 font-medium">Solution</th>
                      <th className="pb-2 text-right font-medium">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insights.proposalsBySolution.map((row) => (
                      <tr
                        key={row.slug}
                        className="border-b border-(--border)/60 hover:bg-emerald-50/40"
                      >
                        <td className="py-2 pr-3 font-medium text-(--foreground)">{row.name}</td>
                        <td className="py-2 text-right tabular-nums">{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="rounded-xl border border-(--border) bg-(--card) p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-(--foreground)">Top products</h2>
              <div className="flex items-center gap-2">
                <label className="text-sm text-(--muted-foreground)">Sort by</label>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "quantity" | "revenue")}
                >
                  <option value="quantity">Quantity sold</option>
                  <option value="revenue">Revenue</option>
                </Select>
              </div>
            </div>
            {insights.topProducts.length === 0 ? (
              <p className="text-sm text-(--muted-foreground)">No line items in range.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-(--border) text-left text-(--muted-foreground)">
                      <th className="pb-2 pr-3 font-medium">#</th>
                      <th className="pb-2 pr-3 font-medium">Product</th>
                      <th className="pb-2 pr-3 text-right font-medium">Qty</th>
                      <th className="pb-2 text-right font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insights.topProducts.map((product, index) => (
                      <tr
                        key={product.productId}
                        className="border-b border-(--border)/60 hover:bg-emerald-50/40"
                      >
                        <td className="py-2 pr-3 text-(--muted-foreground)">{index + 1}</td>
                        <td className="py-2 pr-3 font-medium text-(--foreground)">
                          {product.productName}
                        </td>
                        <td className="py-2 pr-3 text-right tabular-nums">{product.quantity}</td>
                        <td className="py-2 text-right tabular-nums">
                          {formatMoney(product.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      ) : null}
    </main>
  );
}

function SummaryCard({
  label,
  value,
  gradient,
}: {
  label: string;
  value: string;
  gradient: string;
}) {
  return (
    <div
      className={`rounded-xl bg-gradient-to-br ${gradient} p-5 text-white shadow-md`}
    >
      <p className="text-sm font-medium text-white/85">{label}</p>
      <p className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">{value}</p>
    </div>
  );
}
