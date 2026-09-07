"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "@convex/_generated/api";
import { Select } from "@bolt-energy/ui/components/inputs";
import { formatDate, formatMoney } from "@/lib/format";
import { useStaffQueryArgs } from "@/lib/use-staff-query-args";

export default function OrdersPage() {
  const staffArgs = useStaffQueryArgs();
  const [status, setStatus] = useState<
    "all" | "new" | "quoted" | "confirmed" | "fulfilled" | "cancelled"
  >("all");
  const orders = useQuery(
    api.orders.list,
    staffArgs === "skip" ? "skip" : status === "all" ? {} : { status }
  );

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-bold text-(--primary)">Orders</h1>
      <Select
        value={status}
        onChange={(event) =>
          setStatus(event.target.value as typeof status)
        }
      >
        <option value="all">All</option>
        <option value="new">new</option>
        <option value="quoted">quoted</option>
        <option value="confirmed">confirmed</option>
        <option value="fulfilled">fulfilled</option>
        <option value="cancelled">cancelled</option>
      </Select>
      {orders === undefined ? (
        <p>Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-(--border)">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-(--secondary)">
              <tr>
                <th className="px-3 py-2">Order</th>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Payment</th>
                <th className="px-3 py-2">Total</th>
                <th className="px-3 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(({ order, customer }) => (
                <tr key={order._id} className="border-t border-(--border)">
                  <td className="px-3 py-2">
                    <Link href={`/orders/${order._id}`} className="font-semibold text-(--primary)">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-3 py-2">
                    {customer.name}
                    <div className="text-xs text-(--muted-foreground)">{customer.phone}</div>
                  </td>
                  <td className="px-3 py-2">{order.status}</td>
                  <td className="px-3 py-2">{order.paymentStatus}</td>
                  <td className="px-3 py-2">{formatMoney(order.totalIncVat)}</td>
                  <td className="px-3 py-2">{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
