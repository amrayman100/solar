"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { Button } from "@bolt-energy/ui/components/button";
import { Select, Textarea } from "@bolt-energy/ui/components/inputs";
import { errorMessage, formatDate, formatMoney } from "@/lib/format";
import { useStaffQueryArgs } from "@/lib/use-staff-query-args";

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-(--border) bg-(--card) p-4 shadow-sm ${className}`}>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-(--muted-foreground)">
        {title}
      </h2>
      {children}
    </section>
  );
}

function StatusBadge({
  value,
  tone,
}: {
  value: string;
  tone: "neutral" | "ok" | "warn" | "bad";
}) {
  const tones = {
    neutral: "bg-(--secondary) text-(--foreground)",
    ok: "bg-emerald-100 text-emerald-800",
    warn: "bg-amber-100 text-amber-900",
    bad: "bg-red-100 text-red-800",
  } as const;
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${tones[tone]}`}
    >
      {value}
    </span>
  );
}

function statusTone(status: string): "neutral" | "ok" | "warn" | "bad" {
  if (status === "fulfilled" || status === "confirmed" || status === "paid") return "ok";
  if (status === "cancelled") return "bad";
  if (status === "quoted" || status === "partial" || status === "new") return "warn";
  return "neutral";
}

export default function OrderDetailPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId as Id<"orders">;
  const staffArgs = useStaffQueryArgs();
  const data = useQuery(
    api.orders.get,
    staffArgs === "skip" ? "skip" : { orderId }
  );
  const updateStatus = useMutation(api.orders.updateStatus);
  const [error, setError] = useState("");
  const [remarks, setRemarks] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (data === undefined) return <main className="px-6 py-10">Loading…</main>;
  if (!data) return <main className="px-6 py-10">Order not found</main>;

  const { order, customer, items } = data;
  const remarksValue = remarks ?? order.remarks ?? "";

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-6 py-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-(--primary)">{order.orderNumber}</h1>
            <p className="mt-1 text-sm text-(--muted-foreground)">
              Created {formatDate(order.createdAt)}
              {" · "}
              Updated {formatDate(order.updatedAt)}
              {" · "}
              Locale {order.locale.toUpperCase()}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge value={order.status} tone={statusTone(order.status)} />
            <StatusBadge
              value={order.paymentStatus}
              tone={statusTone(order.paymentStatus)}
            />
            {order.paymentMethod ? (
              <StatusBadge value={order.paymentMethod} tone="neutral" />
            ) : null}
            {order.stockDecremented ? (
              <StatusBadge value="stock deducted" tone="ok" />
            ) : (
              <StatusBadge value="stock intact" tone="neutral" />
            )}
          </div>
        </div>
        <Link href="/orders" className="text-sm text-(--muted-foreground) hover:underline">
          ← All orders
        </Link>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Customer" className="lg:col-span-1">
          <p className="text-base font-semibold text-(--foreground)">{customer.name}</p>
          <div className="mt-3 space-y-1.5 text-sm">
            <a className="block text-(--primary) hover:underline" href={`tel:${customer.phone}`}>
              {customer.phone}
            </a>
            {customer.email ? (
              <a
                className="block text-(--primary) hover:underline"
                href={`mailto:${customer.email}`}
              >
                {customer.email}
              </a>
            ) : (
              <p className="text-(--muted-foreground)">No email</p>
            )}
            <a
              className="block text-(--primary) hover:underline"
              href={`https://wa.me/${customer.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </Panel>

        <Panel title="Totals" className="lg:col-span-2">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-(--border)/70">
                <td className="py-2">Subtotal (ex VAT)</td>
                <td className="py-2 text-end tabular-nums">
                  {formatMoney(order.subtotalExVat)}
                </td>
              </tr>
              <tr className="border-b border-(--border)/70">
                <td className="py-2">VAT</td>
                <td className="py-2 text-end tabular-nums">{formatMoney(order.vatAmount)}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Total (inc VAT)</td>
                <td className="py-2 text-end font-semibold tabular-nums">
                  {formatMoney(order.totalIncVat)}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-xs text-(--muted-foreground)">
            Confirming an order decrements stock. Cancelling after confirm restores it.
          </p>
        </Panel>
      </div>

      <Panel title={`Line items (${items.length})`}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-(--secondary)">
              <tr>
                <th className="px-3 py-2">SKU</th>
                <th className="px-3 py-2">Product</th>
                <th className="px-3 py-2 text-end">Qty</th>
                <th className="px-3 py-2 text-end">Unit</th>
                <th className="px-3 py-2 text-end">Line total</th>
                <th className="px-3 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-(--border)">
                  <td className="px-3 py-2 font-mono text-xs">{item.sku}</td>
                  <td className="px-3 py-2">
                    <div className="font-medium">{item.nameEn}</div>
                    {item.nameAr !== item.nameEn ? (
                      <div className="text-xs text-(--muted-foreground)">{item.nameAr}</div>
                    ) : null}
                    <div className="text-xs text-(--muted-foreground)">{item.priceUnit}</div>
                  </td>
                  <td className="px-3 py-2 text-end tabular-nums">{item.quantity}</td>
                  <td className="px-3 py-2 text-end tabular-nums">
                    {item.unitPriceEgp !== undefined ? formatMoney(item.unitPriceEgp) : "quote"}
                  </td>
                  <td className="px-3 py-2 text-end font-medium tabular-nums">
                    {item.lineTotalEgp !== undefined ? formatMoney(item.lineTotalEgp) : "quote"}
                  </td>
                  <td className="px-3 py-2 text-(--muted-foreground)">{item.notes ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Update status">
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            setError("");
            setSaving(true);
            try {
              await updateStatus({
                orderId,
                status: String(form.get("status")) as typeof order.status,
                paymentStatus: String(
                  form.get("paymentStatus")
                ) as typeof order.paymentStatus,
                paymentMethod: (String(form.get("paymentMethod")) || undefined) as
                  | typeof order.paymentMethod
                  | undefined,
                remarks: remarksValue || undefined,
              });
            } catch (err) {
              setError(errorMessage(err, "Update failed"));
            } finally {
              setSaving(false);
            }
          }}
        >
          <label className="block space-y-1 text-sm sm:col-span-1">
            <span className="font-medium">Order status</span>
            <Select name="status" defaultValue={order.status}>
              <option value="new">new</option>
              <option value="quoted">quoted</option>
              <option value="confirmed">confirmed</option>
              <option value="fulfilled">fulfilled</option>
              <option value="cancelled">cancelled</option>
            </Select>
          </label>
          <label className="block space-y-1 text-sm">
            <span className="font-medium">Payment status</span>
            <Select name="paymentStatus" defaultValue={order.paymentStatus}>
              <option value="unpaid">unpaid</option>
              <option value="partial">partial</option>
              <option value="paid">paid</option>
            </Select>
          </label>
          <label className="block space-y-1 text-sm">
            <span className="font-medium">Payment method</span>
            <Select name="paymentMethod" defaultValue={order.paymentMethod ?? ""}>
              <option value="">Not set</option>
              <option value="instapay">instapay</option>
              <option value="bank_transfer">bank_transfer</option>
              <option value="cash">cash</option>
              <option value="other">other</option>
            </Select>
          </label>
          <label className="block space-y-1 text-sm sm:col-span-2">
            <span className="font-medium">Remarks</span>
            <Textarea
              placeholder="Internal notes for this order"
              value={remarksValue}
              onChange={(event) => setRemarks(event.target.value)}
              rows={4}
            />
          </label>
          {error ? <p className="text-sm text-red-700 sm:col-span-2">{error}</p> : null}
          <div className="sm:col-span-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </Panel>
    </main>
  );
}
