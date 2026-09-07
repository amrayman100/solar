import { v } from "convex/values";
import { query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { requireStaff } from "./lib/auth";

function dayBounds(now: number): { start: number; end: number } {
  const s = new Date(now);
  s.setHours(0, 0, 0, 0);
  const e = new Date(now);
  e.setHours(23, 59, 59, 999);
  return { start: s.getTime(), end: e.getTime() };
}

function weekStart(now: number): number {
  const d = new Date(now);
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function monthStart(now: number): number {
  const d = new Date(now);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

const orderStatusValidator = v.object({
  new: v.number(),
  quoted: v.number(),
  confirmed: v.number(),
  fulfilled: v.number(),
  cancelled: v.number(),
});

const periodTotalsValidator = v.object({
  today: v.number(),
  thisWeek: v.number(),
  thisMonth: v.number(),
});

export const getStats = query({
  args: { now: v.number() },
  returns: v.object({
    ops: v.object({
      newOrders: v.number(),
      unpaidOrders: v.number(),
      proposalsThisWeek: v.number(),
      leadsThisWeek: v.number(),
    }),
    ordersByStatus: orderStatusValidator,
    paymentCounts: v.object({
      paid: v.number(),
      partial: v.number(),
      unpaid: v.number(),
    }),
    proposalsBySolution: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        count: v.number(),
      })
    ),
    revenue: periodTotalsValidator,
    revenueOrders: periodTotalsValidator,
    topProducts: v.array(
      v.object({
        productId: v.id("products"),
        productName: v.string(),
        quantity: v.number(),
        revenue: v.number(),
      })
    ),
    lowStock: v.array(
      v.object({
        productId: v.id("products"),
        nameEn: v.string(),
        stockQty: v.number(),
      })
    ),
    leadStats: v.object({
      total: v.number(),
      thisWeek: v.number(),
      thisMonth: v.number(),
    }),
    publishedProducts: v.number(),
    recentOrders: v.array(
      v.object({
        _id: v.id("orders"),
        orderNumber: v.string(),
        customerName: v.string(),
        status: v.string(),
        paymentStatus: v.string(),
        totalIncVat: v.number(),
        createdAt: v.number(),
      })
    ),
    recentProposals: v.array(
      v.object({
        _id: v.id("proposals"),
        customerName: v.string(),
        solutionSlug: v.string(),
        phoneNumber: v.string(),
        city: v.union(v.string(), v.null()),
        isInterested: v.union(v.boolean(), v.null()),
        createdAt: v.number(),
      })
    ),
  }),
  handler: async (ctx, args) => {
    await requireStaff(ctx);

    const today = dayBounds(args.now);
    const weekStartTs = weekStart(args.now);
    const monthStartTs = monthStart(args.now);

    const [orders, monthOrders, proposals, weekProposals, contacts, published, solutions] =
      await Promise.all([
        ctx.db.query("orders").withIndex("by_created").order("desc").take(500),
        ctx.db
          .query("orders")
          .withIndex("by_created", (q) => q.gte("createdAt", monthStartTs))
          .collect(),
        ctx.db.query("proposals").withIndex("by_created").order("desc").take(800),
        ctx.db
          .query("proposals")
          .withIndex("by_created", (q) => q.gte("createdAt", weekStartTs))
          .collect(),
        ctx.db.query("contacts").withIndex("by_created").order("desc").take(500),
        ctx.db
          .query("products")
          .withIndex("by_published", (q) => q.eq("isPublished", true))
          .collect(),
        // eslint-disable-next-line @convex-dev/no-query-collect
        ctx.db.query("solutionProducts").collect(),
      ]);

    const ordersByStatus = {
      new: 0,
      quoted: 0,
      confirmed: 0,
      fulfilled: 0,
      cancelled: 0,
    };
    const paymentCounts = { paid: 0, partial: 0, unpaid: 0 };
    let unpaidOrders = 0;

    for (const order of orders) {
      ordersByStatus[order.status] += 1;
      paymentCounts[order.paymentStatus] += 1;
      if (order.paymentStatus !== "paid" && order.status !== "cancelled") {
        unpaidOrders += 1;
      }
    }

    const revenue = { today: 0, thisWeek: 0, thisMonth: 0 };
    const revenueOrders = { today: 0, thisWeek: 0, thisMonth: 0 };
    const activeMonthOrders = monthOrders.filter(
      (order) => order.status !== "cancelled"
    );

    for (const order of activeMonthOrders) {
      const t = order.createdAt;
      if (t >= today.start && t <= today.end) {
        revenue.today += order.totalIncVat;
        revenueOrders.today += 1;
      }
      if (t >= weekStartTs) {
        revenue.thisWeek += order.totalIncVat;
        revenueOrders.thisWeek += 1;
      }
      revenue.thisMonth += order.totalIncVat;
      revenueOrders.thisMonth += 1;
    }

    const productQty = new Map<string, number>();
    const productRev = new Map<string, number>();
    const monthSample = activeMonthOrders.slice(0, 100);

    for (const order of monthSample) {
      const items = await ctx.db
        .query("orderItems")
        .withIndex("by_order", (q) => q.eq("orderId", order._id))
        .collect();
      for (const item of items) {
        const id = item.productId as string;
        productQty.set(id, (productQty.get(id) ?? 0) + item.quantity);
        productRev.set(
          id,
          (productRev.get(id) ?? 0) + (item.lineTotalEgp ?? 0)
        );
      }
    }

    const topProductIds = Array.from(productQty.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id]) => id);

    const topProducts = await Promise.all(
      topProductIds.map(async (id) => {
        const productId = id as Id<"products">;
        const product = await ctx.db.get(productId);
        return {
          productId,
          productName: product?.nameEn ?? "Unknown",
          quantity: productQty.get(id) ?? 0,
          revenue: productRev.get(id) ?? 0,
        };
      })
    );

    const solutionName = new Map(
      solutions.map((solution) => [solution.slug, solution.name])
    );
    const proposalCounts = new Map<string, number>();
    for (const proposal of proposals) {
      proposalCounts.set(
        proposal.solutionSlug,
        (proposalCounts.get(proposal.solutionSlug) ?? 0) + 1
      );
    }
    const proposalsThisWeek = weekProposals.length;

    const proposalsBySolution = Array.from(proposalCounts.entries())
      .map(([slug, count]) => ({
        slug,
        name: solutionName.get(slug) ?? slug,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    let leadsThisWeek = 0;
    let leadsThisMonth = 0;
    for (const contact of contacts) {
      if (contact.createdAt >= weekStartTs) leadsThisWeek += 1;
      if (contact.createdAt >= monthStartTs) leadsThisMonth += 1;
    }

    const lowStock = published
      .filter(
        (product) =>
          product.availability === "in_stock" && product.stockQty <= 3
      )
      .sort((a, b) => a.stockQty - b.stockQty)
      .slice(0, 8)
      .map((product) => ({
        productId: product._id,
        nameEn: product.nameEn,
        stockQty: product.stockQty,
      }));

    const recentOrderDocs = orders.slice(0, 8);
    const recentOrders = await Promise.all(
      recentOrderDocs.map(async (order) => {
        const customer = await ctx.db.get(order.customerId);
        return {
          _id: order._id,
          orderNumber: order.orderNumber,
          customerName: customer?.name ?? "Unknown",
          status: order.status,
          paymentStatus: order.paymentStatus,
          totalIncVat: order.totalIncVat,
          createdAt: order.createdAt,
        };
      })
    );

    const recentProposals = proposals.slice(0, 8).map((proposal) => ({
      _id: proposal._id,
      customerName: proposal.customerName,
      solutionSlug: proposal.solutionSlug,
      phoneNumber: proposal.phoneNumber,
      city: proposal.city ?? null,
      isInterested: proposal.isInterested ?? null,
      createdAt: proposal.createdAt,
    }));

    return {
      ops: {
        newOrders: ordersByStatus.new,
        unpaidOrders,
        proposalsThisWeek,
        leadsThisWeek,
      },
      ordersByStatus,
      paymentCounts,
      proposalsBySolution,
      revenue,
      revenueOrders,
      topProducts,
      lowStock,
      leadStats: {
        total: contacts.length,
        thisWeek: leadsThisWeek,
        thisMonth: leadsThisMonth,
      },
      publishedProducts: published.length,
      recentOrders,
      recentProposals,
    };
  },
});

/** @deprecated Prefer getStats — kept for any leftover callers. */
export const summary = query({
  args: {},
  returns: v.object({
    newOrders: v.number(),
    unpaidOrders: v.number(),
    proposals: v.number(),
    contacts: v.number(),
    publishedProducts: v.number(),
    lowStock: v.number(),
  }),
  handler: async (ctx) => {
    await requireStaff(ctx);
    const [newOrders, unpaid, proposals, contacts, products] = await Promise.all([
      ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", "new"))
        .collect(),
      ctx.db.query("orders").take(200),
      ctx.db.query("proposals").take(300),
      ctx.db.query("contacts").take(200),
      ctx.db
        .query("products")
        .withIndex("by_published", (q) => q.eq("isPublished", true))
        .collect(),
    ]);
    return {
      newOrders: newOrders.length,
      unpaidOrders: unpaid.filter((order) => order.paymentStatus !== "paid")
        .length,
      proposals: proposals.length,
      contacts: contacts.length,
      publishedProducts: products.length,
      lowStock: products.filter(
        (product) =>
          product.availability === "in_stock" && product.stockQty <= 3
      ).length,
    };
  },
});
