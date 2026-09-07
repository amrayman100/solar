"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  FileText,
  Package,
  Settings,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { formatMoney } from "@/lib/format";
import { useStaffQueryArgs } from "@/lib/use-staff-query-args";

export default function DashboardPage() {
  const staffArgs = useStaffQueryArgs();
  // Stable clock for the session so the query args do not churn every render.
  const [now] = useState(() => Date.now());
  const stats = useQuery(
    api.dashboard.getStats,
    staffArgs === "skip" ? "skip" : { now }
  );

  if (stats === undefined) {
    return (
      <main className="mx-auto max-w-7xl space-y-6 px-6 py-10">
        <Header />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-(--muted)" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="h-80 animate-pulse rounded-xl bg-(--muted)" />
          <div className="h-80 animate-pulse rounded-xl bg-(--muted)" />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-6 py-10">
      <Header />
      <OpsStrip stats={stats} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OrderPipeline ordersByStatus={stats.ordersByStatus} />
        <ProposalMix proposals={stats.proposalsBySolution} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <QuickActions />
        <LowStock products={stats.lowStock} published={stats.publishedProducts} />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RevenueCards revenue={stats.revenue} revenueOrders={stats.revenueOrders} />
        <TopProducts products={stats.topProducts} />
        <LeadInsights stats={stats.leadStats} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentOrders orders={stats.recentOrders} />
        <RecentProposals proposals={stats.recentProposals} />
      </div>
    </main>
  );
}

function Header() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-sm font-semibold tracking-wide text-(--primary)">BOLT ENERGY</p>
        <h1 className="text-3xl font-bold text-(--primary)">Dashboard</h1>
        <p className="mt-1 text-sm text-(--muted-foreground)">
          Operations overview and business insights.
        </p>
      </div>
      <Link
        href="/reports?preset=month"
        className="inline-flex items-center gap-1 text-sm font-medium text-(--primary) hover:underline"
      >
        View reports <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

type StatsData = NonNullable<ReturnType<typeof useQuery<typeof api.dashboard.getStats>>>;

function OpsStrip({ stats }: { stats: StatsData }) {
  const cards = [
    {
      label: "New orders",
      value: stats.ops.newOrders,
      icon: ShoppingCart,
      gradient: "from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-400/30",
    },
    {
      label: "Unpaid orders",
      value: stats.ops.unpaidOrders,
      icon: DollarSign,
      gradient: "from-teal-500 to-teal-600",
      iconBg: "bg-teal-400/30",
    },
    {
      label: "Proposals this week",
      value: stats.ops.proposalsThisWeek,
      icon: FileText,
      gradient: "from-lime-500 to-green-600",
      iconBg: "bg-lime-400/30",
    },
    {
      label: "Leads this week",
      value: stats.ops.leadsThisWeek,
      icon: Users,
      gradient: "from-cyan-500 to-teal-600",
      iconBg: "bg-cyan-400/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">{card.label}</p>
                <p className="mt-1 text-3xl font-bold">{card.value}</p>
              </div>
              <div className={`${card.iconBg} rounded-xl p-3`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Icon className="h-24 w-24" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OrderPipeline({
  ordersByStatus,
}: {
  ordersByStatus: StatsData["ordersByStatus"];
}) {
  const stages = [
    { key: "new" as const, label: "New", color: "bg-emerald-500", textColor: "text-emerald-700", bgLight: "bg-emerald-50" },
    { key: "quoted" as const, label: "Quoted", color: "bg-teal-500", textColor: "text-teal-700", bgLight: "bg-teal-50" },
    { key: "confirmed" as const, label: "Confirmed", color: "bg-sky-500", textColor: "text-sky-800", bgLight: "bg-sky-50" },
    { key: "fulfilled" as const, label: "Fulfilled", color: "bg-green-600", textColor: "text-green-700", bgLight: "bg-green-50" },
    { key: "cancelled" as const, label: "Cancelled", color: "bg-gray-400", textColor: "text-gray-600", bgLight: "bg-gray-50" },
  ];

  const total = Object.values(ordersByStatus).reduce((sum, value) => sum + value, 0);

  return (
    <DashCard
      title="Order pipeline"
      icon={<ShoppingCart className="h-5 w-5 text-(--primary)" />}
      action={
        <Link
          href="/orders"
          className="flex items-center gap-1 text-xs font-medium text-(--primary) hover:underline"
        >
          All orders <ArrowRight className="h-3 w-3" />
        </Link>
      }
    >
      {total > 0 ? (
        <div className="mb-5 flex h-4 overflow-hidden rounded-full">
          {stages.map((stage) => {
            const count = ordersByStatus[stage.key];
            const pct = (count / total) * 100;
            if (pct === 0) return null;
            return (
              <div
                key={stage.key}
                className={`${stage.color} transition-all`}
                style={{ width: `${pct}%` }}
                title={`${stage.label}: ${count}`}
              />
            );
          })}
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage.key} className={`${stage.bgLight} rounded-lg p-3 text-center`}>
            <p className="text-2xl font-bold text-(--foreground)">{ordersByStatus[stage.key]}</p>
            <p className={`mt-0.5 text-xs font-medium ${stage.textColor}`}>{stage.label}</p>
          </div>
        ))}
      </div>
    </DashCard>
  );
}

function ProposalMix({
  proposals,
}: {
  proposals: StatsData["proposalsBySolution"];
}) {
  const total = proposals.reduce((sum, row) => sum + row.count, 0);
  const max = proposals[0]?.count ?? 1;

  return (
    <DashCard
      title="Proposals by solution"
      icon={<FileText className="h-5 w-5 text-(--primary)" />}
      action={
        <Link
          href="/proposals"
          className="flex items-center gap-1 text-xs font-medium text-(--primary) hover:underline"
        >
          All proposals <ArrowRight className="h-3 w-3" />
        </Link>
      }
    >
      {proposals.length === 0 ? (
        <EmptyState icon={<CheckCircle2 className="h-10 w-10" />} label="No proposals yet" />
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-(--muted-foreground)">{total} total proposals</p>
          {proposals.slice(0, 6).map((row) => (
            <div key={row.slug} className="space-y-1">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate font-medium text-(--foreground)">{row.name}</span>
                <span className="shrink-0 text-xs text-(--muted-foreground)">{row.count}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-(--muted)">
                <div
                  className="h-full rounded-full bg-(--primary)"
                  style={{ width: `${(row.count / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </DashCard>
  );
}

function QuickActions() {
  const actions = [
    {
      label: "Catalogue",
      href: "/catalogue",
      icon: Package,
      gradient: "from-emerald-500 to-emerald-600",
      primary: true,
    },
    {
      label: "Orders",
      href: "/orders",
      icon: ShoppingCart,
      gradient: "from-teal-500 to-teal-600",
      primary: false,
    },
    {
      label: "Proposals",
      href: "/proposals",
      icon: FileText,
      gradient: "from-lime-500 to-green-600",
      primary: false,
    },
    {
      label: "Simulators",
      href: "/settings",
      icon: Settings,
      gradient: "from-cyan-500 to-teal-600",
      primary: false,
    },
  ];

  return (
    <DashCard
      title="Quick actions"
      icon={<TrendingUp className="h-5 w-5 text-(--primary)" />}
    >
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className={`flex flex-col items-center justify-center rounded-xl p-4 transition-all hover:scale-[1.02] hover:shadow-md ${
                action.primary
                  ? `bg-gradient-to-br ${action.gradient} text-white shadow-lg`
                  : "border border-(--border) bg-(--secondary) text-(--secondary-foreground) hover:bg-(--accent)"
              }`}
            >
              <Icon
                className={`mb-2 h-6 w-6 ${action.primary ? "text-white" : "text-(--primary)"}`}
              />
              <span className="text-sm font-medium">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </DashCard>
  );
}

function LowStock({
  products,
  published,
}: {
  products: StatsData["lowStock"];
  published: number;
}) {
  return (
    <DashCard
      title="Stock alerts"
      subtitle={`${published} published products`}
      icon={<AlertTriangle className="h-5 w-5 text-(--primary)" />}
      action={
        <Link
          href="/catalogue"
          className="flex items-center gap-1 text-xs font-medium text-(--primary) hover:underline"
        >
          Catalogue <ArrowRight className="h-3 w-3" />
        </Link>
      }
    >
      {products.length === 0 ? (
        <EmptyState icon={<CheckCircle2 className="h-10 w-10" />} label="No low-stock items" />
      ) : (
        <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
          {products.map((product) => (
            <div
              key={product.productId}
              className="flex items-center justify-between rounded-lg border border-(--border) px-3 py-2"
            >
              <span className="truncate text-sm font-medium text-(--foreground)">
                {product.nameEn}
              </span>
              <span
                className={`ml-3 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                  product.stockQty === 0
                    ? "bg-red-50 text-red-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {product.stockQty === 0 ? "Out" : `${product.stockQty} left`}
              </span>
            </div>
          ))}
        </div>
      )}
    </DashCard>
  );
}

function RevenueCards({
  revenue,
  revenueOrders,
}: {
  revenue: StatsData["revenue"];
  revenueOrders: StatsData["revenueOrders"];
}) {
  const periods = [
    { label: "Today", value: revenue.today, orders: revenueOrders.today, accent: "text-emerald-700" },
    { label: "This week", value: revenue.thisWeek, orders: revenueOrders.thisWeek, accent: "text-teal-700" },
    { label: "This month", value: revenue.thisMonth, orders: revenueOrders.thisMonth, accent: "text-green-700" },
  ];

  return (
    <DashCard
      title="Shop revenue"
      icon={<DollarSign className="h-5 w-5 text-(--primary)" />}
      action={
        <Link
          href="/reports?preset=month"
          className="flex items-center gap-1 text-xs font-medium text-(--primary) hover:underline"
        >
          Reports <ArrowRight className="h-3 w-3" />
        </Link>
      }
    >
      <div className="space-y-4">
        {periods.map((period) => (
          <div key={period.label} className="flex items-center justify-between gap-2">
            <div>
              <span className="block text-sm text-(--muted-foreground)">{period.label}</span>
              <span className="text-xs text-(--muted-foreground)/80">{period.orders} orders</span>
            </div>
            <span className={`shrink-0 text-lg font-bold ${period.accent}`}>
              {formatMoney(period.value)}
            </span>
          </div>
        ))}
      </div>
    </DashCard>
  );
}

function TopProducts({ products }: { products: StatsData["topProducts"] }) {
  const maxQty = products[0]?.quantity ?? 1;

  return (
    <DashCard
      title="Top products"
      subtitle="This month"
      icon={<Star className="h-5 w-5 text-(--primary)" />}
      action={
        <Link
          href="/reports?preset=month"
          className="flex items-center gap-1 text-xs font-medium text-(--primary) hover:underline"
        >
          Reports <ArrowRight className="h-3 w-3" />
        </Link>
      }
    >
      {products.length === 0 ? (
        <p className="py-6 text-center text-sm text-(--muted-foreground)">No orders this month</p>
      ) : (
        <div className="space-y-3">
          {products.map((product, index) => (
            <div key={product.productId} className="space-y-1">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="flex min-w-0 items-center gap-2 font-medium text-(--foreground)">
                  <span className="w-4 shrink-0 text-xs text-(--muted-foreground)">#{index + 1}</span>
                  <span className="truncate">{product.productName}</span>
                </span>
                <div className="shrink-0 text-right">
                  <span className="block text-xs text-(--muted-foreground)">{product.quantity} sold</span>
                  <span className="text-xs font-semibold text-emerald-700">
                    {formatMoney(product.revenue)}
                  </span>
                </div>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-(--muted)">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${(product.quantity / maxQty) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </DashCard>
  );
}

function LeadInsights({ stats }: { stats: StatsData["leadStats"] }) {
  return (
    <DashCard
      title="Leads"
      icon={<Users className="h-5 w-5 text-(--primary)" />}
      action={
        <Link
          href="/leads"
          className="flex items-center gap-1 text-xs font-medium text-(--primary) hover:underline"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      }
    >
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-(--secondary) p-3 text-center">
          <p className="text-2xl font-bold text-(--foreground)">{stats.total}</p>
          <p className="mt-0.5 text-xs text-(--muted-foreground)">Total</p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-3 text-center">
          <p className="text-2xl font-bold text-emerald-700">{stats.thisWeek}</p>
          <p className="mt-0.5 text-xs text-emerald-600">This week</p>
        </div>
        <div className="rounded-lg bg-teal-50 p-3 text-center">
          <p className="text-2xl font-bold text-teal-700">{stats.thisMonth}</p>
          <p className="mt-0.5 text-xs text-teal-600">This month</p>
        </div>
      </div>
    </DashCard>
  );
}

function RecentOrders({ orders }: { orders: StatsData["recentOrders"] }) {
  const statusColors: Record<string, string> = {
    new: "bg-emerald-100 text-emerald-800",
    quoted: "bg-teal-100 text-teal-800",
    confirmed: "bg-sky-100 text-sky-900",
    fulfilled: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <DashCard
      title="Recent orders"
      icon={<ClipboardList className="h-5 w-5 text-(--primary)" />}
      action={
        <Link
          href="/orders"
          className="flex items-center gap-1 text-xs font-medium text-(--primary) hover:underline"
        >
          All orders <ArrowRight className="h-3 w-3" />
        </Link>
      }
    >
      {orders.length === 0 ? (
        <p className="py-6 text-center text-sm text-(--muted-foreground)">No orders yet</p>
      ) : (
        <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              className="flex items-center justify-between rounded-lg border border-(--border) p-3 transition-colors hover:border-emerald-200 hover:bg-emerald-50/50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-(--foreground)">
                    {order.customerName}
                  </span>
                  <span
                    className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${statusColors[order.status] ?? "bg-gray-100 text-gray-700"}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-(--muted-foreground)">
                  #{order.orderNumber} · {order.paymentStatus}
                </p>
              </div>
              <div className="ml-3 shrink-0 text-right">
                <p className="text-sm font-semibold text-(--foreground)">
                  {formatMoney(order.totalIncVat)}
                </p>
                <p className="text-[10px] text-(--muted-foreground)">{timeAgo(order.createdAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </DashCard>
  );
}

function RecentProposals({
  proposals,
}: {
  proposals: StatsData["recentProposals"];
}) {
  return (
    <DashCard
      title="Recent proposals"
      icon={<FileText className="h-5 w-5 text-(--primary)" />}
      action={
        <Link
          href="/proposals"
          className="flex items-center gap-1 text-xs font-medium text-(--primary) hover:underline"
        >
          All proposals <ArrowRight className="h-3 w-3" />
        </Link>
      }
    >
      {proposals.length === 0 ? (
        <p className="py-6 text-center text-sm text-(--muted-foreground)">No proposals yet</p>
      ) : (
        <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
          {proposals.map((proposal) => (
            <Link
              key={proposal._id}
              href={`/proposals/${proposal._id}`}
              className="flex items-center justify-between rounded-lg border border-(--border) p-3 transition-colors hover:border-emerald-200 hover:bg-emerald-50/50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-(--foreground)">
                    {proposal.customerName}
                  </span>
                  {proposal.isInterested ? (
                    <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-800">
                      interested
                    </span>
                  ) : null}
                </div>
                <p className="mt-0.5 truncate text-xs text-(--muted-foreground)">
                  {proposal.solutionSlug}
                  {proposal.city ? ` · ${proposal.city}` : ""}
                </p>
              </div>
              <div className="ml-3 shrink-0 text-right">
                <p className="text-xs text-(--muted-foreground)">{proposal.phoneNumber}</p>
                <p className="text-[10px] text-(--muted-foreground)">
                  {timeAgo(proposal.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </DashCard>
  );
}

function DashCard({
  title,
  subtitle,
  icon,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-(--border) bg-(--card) p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <h3 className="text-sm font-semibold text-(--foreground)">{title}</h3>
            {subtitle ? (
              <p className="text-[11px] text-(--muted-foreground)">{subtitle}</p>
            ) : null}
          </div>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function EmptyState({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-(--muted-foreground)">
      <div className="mb-2">{icon}</div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}
