import { v } from "convex/values";
import { query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { requireStaff } from "./lib/auth";

const MAX_RANGE_MS = 366 * 24 * 60 * 60 * 1000;
const MAX_DAY_BUCKETS = 400;
const MAX_WEEK_BUCKETS = 60;
const MAX_MONTH_BUCKETS = 24;

type Granularity = "day" | "week" | "month";

function utcDayStart(ts: number): number {
  const d = new Date(ts);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0);
}

function utcMondayWeekStart(ts: number): number {
  const d = new Date(ts);
  const utcDow = d.getUTCDay();
  const daysFromMonday = utcDow === 0 ? 6 : utcDow - 1;
  return Date.UTC(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate() - daysFromMonday,
    0,
    0,
    0,
    0
  );
}

function utcMonthStart(ts: number): number {
  const d = new Date(ts);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1, 0, 0, 0, 0);
}

function addUtcDays(ms: number, days: number): number {
  return ms + days * 24 * 60 * 60 * 1000;
}

function addUtcMonths(ms: number, months: number): number {
  const d = new Date(ms);
  d.setUTCMonth(d.getUTCMonth() + months);
  return d.getTime();
}

function formatDayLabel(bucketStart: number): string {
  return new Date(bucketStart).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatWeekLabel(bucketStart: number): string {
  const end = addUtcDays(bucketStart, 6);
  const a = new Date(bucketStart).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const b = new Date(end).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${a} – ${b}`;
}

function formatMonthLabel(bucketStart: number): string {
  return new Date(bucketStart).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function bucketStartForOrder(ts: number, g: Granularity): number {
  if (g === "day") return utcDayStart(ts);
  if (g === "week") return utcMondayWeekStart(ts);
  return utcMonthStart(ts);
}

function bucketEndExclusive(bucketStart: number, g: Granularity): number {
  if (g === "day") return addUtcDays(bucketStart, 1);
  if (g === "week") return addUtcDays(bucketStart, 7);
  return addUtcMonths(bucketStart, 1);
}

function labelForBucket(bucketStart: number, g: Granularity): string {
  if (g === "day") return formatDayLabel(bucketStart);
  if (g === "week") return formatWeekLabel(bucketStart);
  return formatMonthLabel(bucketStart);
}

function enumerateBuckets(
  startMs: number,
  endMs: number,
  g: Granularity,
  maxBuckets: number
): number[] {
  const out: number[] = [];
  if (g === "day") {
    let b = utcDayStart(startMs);
    const endDay = utcDayStart(endMs);
    while (b <= endDay) {
      out.push(b);
      if (out.length > maxBuckets) {
        throw new Error(
          "Too many day buckets; narrow the range or use week/month granularity."
        );
      }
      b = addUtcDays(b, 1);
    }
  } else if (g === "week") {
    let w = utcMondayWeekStart(startMs);
    const lastW = utcMondayWeekStart(endMs);
    while (w <= lastW) {
      out.push(w);
      if (out.length > maxBuckets) {
        throw new Error(
          "Too many week buckets; narrow the range or use month granularity."
        );
      }
      w = addUtcDays(w, 7);
    }
  } else {
    let m = utcMonthStart(startMs);
    const endM = utcMonthStart(endMs);
    while (m <= endM) {
      out.push(m);
      if (out.length > maxBuckets) {
        throw new Error("Too many month buckets; narrow the date range.");
      }
      m = addUtcMonths(m, 1);
    }
  }
  return out;
}

const countRevenueValidator = v.object({
  orders: v.number(),
  revenue: v.number(),
});

export const getInsights = query({
  args: {
    startMs: v.number(),
    endMs: v.number(),
    trendGranularity: v.optional(
      v.union(v.literal("day"), v.literal("week"), v.literal("month"))
    ),
    topProductsLimit: v.optional(v.number()),
    sortBy: v.optional(v.union(v.literal("quantity"), v.literal("revenue"))),
  },
  returns: v.object({
    summary: v.object({
      orderCount: v.number(),
      totalRevenue: v.number(),
      averageOrderValue: v.number(),
      proposalCount: v.number(),
      leadCount: v.number(),
    }),
    trendGranularity: v.union(
      v.literal("day"),
      v.literal("week"),
      v.literal("month")
    ),
    trendSeries: v.array(
      v.object({
        bucketStartMs: v.number(),
        bucketEndMs: v.number(),
        label: v.string(),
        orderCount: v.number(),
        revenue: v.number(),
        proposalCount: v.number(),
      })
    ),
    topProducts: v.array(
      v.object({
        productId: v.id("products"),
        productName: v.string(),
        quantity: v.number(),
        revenue: v.number(),
      })
    ),
    paymentStatusBreakdown: v.object({
      paid: countRevenueValidator,
      partial: countRevenueValidator,
      unpaid: countRevenueValidator,
    }),
    orderStatusBreakdown: v.object({
      new: countRevenueValidator,
      quoted: countRevenueValidator,
      confirmed: countRevenueValidator,
      fulfilled: countRevenueValidator,
      cancelled: countRevenueValidator,
    }),
    proposalsBySolution: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        count: v.number(),
      })
    ),
  }),
  handler: async (ctx, args) => {
    await requireStaff(ctx);

    const { startMs, endMs } = args;
    if (endMs < startMs) throw new Error("endMs must be >= startMs");
    if (endMs - startMs > MAX_RANGE_MS) {
      throw new Error("Date range cannot exceed 366 days");
    }

    const trendGranularity: Granularity = args.trendGranularity ?? "week";
    const topLimit = Math.min(50, Math.max(1, args.topProductsLimit ?? 10));
    const sortBy = args.sortBy ?? "quantity";

    const maxBuckets =
      trendGranularity === "day"
        ? MAX_DAY_BUCKETS
        : trendGranularity === "week"
          ? MAX_WEEK_BUCKETS
          : MAX_MONTH_BUCKETS;

    const bucketStarts = enumerateBuckets(
      startMs,
      endMs,
      trendGranularity,
      maxBuckets
    );

    const [orders, proposals, contacts, solutions] = await Promise.all([
      ctx.db
        .query("orders")
        .withIndex("by_created", (q) =>
          q.gte("createdAt", startMs).lte("createdAt", endMs)
        )
        .collect(),
      ctx.db
        .query("proposals")
        .withIndex("by_created", (q) =>
          q.gte("createdAt", startMs).lte("createdAt", endMs)
        )
        .collect(),
      ctx.db
        .query("contacts")
        .withIndex("by_created", (q) =>
          q.gte("createdAt", startMs).lte("createdAt", endMs)
        )
        .collect(),
      // eslint-disable-next-line @convex-dev/no-query-collect
      ctx.db.query("solutionProducts").collect(),
    ]);

    const activeOrders = orders.filter((order) => order.status !== "cancelled");

    const paymentStatusBreakdown = {
      paid: { orders: 0, revenue: 0 },
      partial: { orders: 0, revenue: 0 },
      unpaid: { orders: 0, revenue: 0 },
    };
    const orderStatusBreakdown = {
      new: { orders: 0, revenue: 0 },
      quoted: { orders: 0, revenue: 0 },
      confirmed: { orders: 0, revenue: 0 },
      fulfilled: { orders: 0, revenue: 0 },
      cancelled: { orders: 0, revenue: 0 },
    };

    const bucketMap = new Map<
      number,
      { orderCount: number; revenue: number; proposalCount: number }
    >();
    for (const b of bucketStarts) {
      bucketMap.set(b, { orderCount: 0, revenue: 0, proposalCount: 0 });
    }

    let totalRevenue = 0;
    const productQty = new Map<string, number>();
    const productRev = new Map<string, number>();

    for (const order of orders) {
      const cell = orderStatusBreakdown[order.status];
      cell.orders += 1;
      cell.revenue += order.totalIncVat;
    }

    for (const order of activeOrders) {
      totalRevenue += order.totalIncVat;
      paymentStatusBreakdown[order.paymentStatus].orders += 1;
      paymentStatusBreakdown[order.paymentStatus].revenue += order.totalIncVat;

      const bs = bucketStartForOrder(order.createdAt, trendGranularity);
      let agg = bucketMap.get(bs);
      if (!agg) {
        agg = { orderCount: 0, revenue: 0, proposalCount: 0 };
        bucketMap.set(bs, agg);
      }
      agg.orderCount += 1;
      agg.revenue += order.totalIncVat;

      const items = await ctx.db
        .query("orderItems")
        .withIndex("by_order", (q) => q.eq("orderId", order._id))
        .collect();
      for (const item of items) {
        const pid = item.productId as string;
        productQty.set(pid, (productQty.get(pid) ?? 0) + item.quantity);
        productRev.set(
          pid,
          (productRev.get(pid) ?? 0) + (item.lineTotalEgp ?? 0)
        );
      }
    }

    for (const proposal of proposals) {
      const bs = bucketStartForOrder(proposal.createdAt, trendGranularity);
      let agg = bucketMap.get(bs);
      if (!agg) {
        agg = { orderCount: 0, revenue: 0, proposalCount: 0 };
        bucketMap.set(bs, agg);
      }
      agg.proposalCount += 1;
    }

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
    const proposalsBySolution = Array.from(proposalCounts.entries())
      .map(([slug, count]) => ({
        slug,
        name: solutionName.get(slug) ?? slug,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    const trendSeries = Array.from(bucketMap.keys())
      .sort((a, b) => a - b)
      .map((bucketStart) => {
        const cell = bucketMap.get(bucketStart)!;
        return {
          bucketStartMs: bucketStart,
          bucketEndMs: bucketEndExclusive(bucketStart, trendGranularity) - 1,
          label: labelForBucket(bucketStart, trendGranularity),
          orderCount: cell.orderCount,
          revenue: cell.revenue,
          proposalCount: cell.proposalCount,
        };
      });

    const productIds = Array.from(productQty.keys()) as Id<"products">[];
    const nameById = new Map<string, string>();
    await Promise.all(
      productIds.map(async (productId) => {
        const product = await ctx.db.get(productId);
        if (product) nameById.set(productId, product.nameEn);
      })
    );

    const topList = Array.from(productQty.entries()).map(
      ([productId, quantity]) => ({
        productId: productId as Id<"products">,
        productName: nameById.get(productId) ?? "Unknown",
        quantity,
        revenue: productRev.get(productId) ?? 0,
      })
    );
    topList.sort((a, b) =>
      sortBy === "revenue" ? b.revenue - a.revenue : b.quantity - a.quantity
    );

    const orderCount = activeOrders.length;
    return {
      summary: {
        orderCount,
        totalRevenue,
        averageOrderValue: orderCount > 0 ? totalRevenue / orderCount : 0,
        proposalCount: proposals.length,
        leadCount: contacts.length,
      },
      trendGranularity,
      trendSeries,
      topProducts: topList.slice(0, topLimit),
      paymentStatusBreakdown,
      orderStatusBreakdown,
      proposalsBySolution,
    };
  },
});
