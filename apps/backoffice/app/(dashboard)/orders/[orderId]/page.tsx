"use client";

import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { Button } from "@bolt-energy/ui/components/button";
import { Select, Textarea } from "@bolt-energy/ui/components/inputs";
import { errorMessage, formatMoney } from "@/lib/format";
import { useStaffQueryArgs } from "@/lib/use-staff-query-args";

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
  const [remarks, setRemarks] = useState("");

  if (data === undefined) return <main className="px-6 py-10">Loading…</main>;
  if (!data) return <main className="px-6 py-10">Order not found</main>;

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-10">
      <h1 className="text-3xl font-bold text-(--primary)">{data.order.orderNumber}</h1>
      <p>
        {data.customer.name} · {data.customer.phone} · {data.customer.email ?? "no email"}
      </p>
      <p className="text-sm text-(--muted-foreground)">
        Confirming an order decrements stock. Cancelling after confirm restores it.
      </p>
      <ul className="space-y-2 rounded-xl border border-(--border) p-4 text-sm">
        {data.items.map((item) => (
          <li key={item._id} className="flex justify-between">
            <span>
              {item.nameEn} × {item.quantity}
            </span>
            <span>
              {item.lineTotalEgp !== undefined ? formatMoney(item.lineTotalEgp) : "quote"}
            </span>
          </li>
        ))}
      </ul>
      <p className="font-semibold">Total inc VAT: {formatMoney(data.order.totalIncVat)}</p>
      <form
        className="space-y-3"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          setError("");
          try {
            await updateStatus({
              orderId,
              status: String(form.get("status")) as typeof data.order.status,
              paymentStatus: String(form.get("paymentStatus")) as typeof data.order.paymentStatus,
              paymentMethod: (String(form.get("paymentMethod")) || undefined) as
                | typeof data.order.paymentMethod
                | undefined,
              remarks: remarks || undefined,
            });
          } catch (err) {
            setError(errorMessage(err, "Update failed"));
          }
        }}
      >
        <Select name="status" defaultValue={data.order.status}>
          <option value="new">new</option>
          <option value="quoted">quoted</option>
          <option value="confirmed">confirmed</option>
          <option value="fulfilled">fulfilled</option>
          <option value="cancelled">cancelled</option>
        </Select>
        <Select name="paymentStatus" defaultValue={data.order.paymentStatus}>
          <option value="unpaid">unpaid</option>
          <option value="partial">partial</option>
          <option value="paid">paid</option>
        </Select>
        <Select name="paymentMethod" defaultValue={data.order.paymentMethod ?? ""}>
          <option value="">Payment method</option>
          <option value="instapay">instapay</option>
          <option value="bank_transfer">bank_transfer</option>
          <option value="cash">cash</option>
          <option value="other">other</option>
        </Select>
        <Textarea
          placeholder="Remarks"
          defaultValue={data.order.remarks ?? ""}
          onChange={(event) => setRemarks(event.target.value)}
        />
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <Button type="submit">Save</Button>
      </form>
    </main>
  );
}
