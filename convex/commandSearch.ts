import { v } from "convex/values";
import { query, type QueryCtx } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { requireStaff } from "./lib/auth";

const MAX_QUERY_LEN = 64;
const MAX_RECENT_SCAN = 500;

const hitValidator = v.object({
  id: v.string(),
  title: v.string(),
  description: v.optional(v.string()),
  href: v.string(),
  keywords: v.array(v.string()),
});

function clampLimit(n: number | undefined, fallback: number, max: number) {
  const x = n ?? fallback;
  return Math.min(Math.max(x, 1), max);
}

function trimQuery(raw: string) {
  return raw.trim().slice(0, MAX_QUERY_LEN);
}

async function tryGetOrderById(
  ctx: QueryCtx,
  raw: string
): Promise<Doc<"orders"> | null> {
  if (raw.length < 12 || !/^[a-z0-9]+$/i.test(raw)) return null;
  try {
    return (await ctx.db.get(raw as Id<"orders">)) ?? null;
  } catch {
    return null;
  }
}

async function tryGetProposalById(
  ctx: QueryCtx,
  raw: string
): Promise<Doc<"proposals"> | null> {
  if (raw.length < 12 || !/^[a-z0-9]+$/i.test(raw)) return null;
  try {
    return (await ctx.db.get(raw as Id<"proposals">)) ?? null;
  } catch {
    return null;
  }
}

function formatOrderHit(
  order: Doc<"orders">,
  customerName: string
): {
  id: string;
  title: string;
  description: string;
  href: string;
  keywords: string[];
} {
  return {
    id: order._id,
    title: order.orderNumber,
    description: `${order.status} · ${customerName} · ${order.totalIncVat.toLocaleString("en-EG")} EGP`,
    href: `/orders/${order._id}`,
    keywords: [
      order._id,
      order.orderNumber,
      customerName,
      order.status,
      order.paymentStatus,
    ],
  };
}

function formatProposalHit(p: Doc<"proposals">) {
  return {
    id: p._id as string,
    title: p.customerName,
    description: `${p.solutionSlug} · ${p.phoneNumber}${p.email ? ` · ${p.email}` : ""}`,
    href: `/proposals/${p._id}`,
    keywords: [
      p._id as string,
      p.customerName,
      p.phoneNumber,
      p.email ?? "",
      p.solutionSlug,
      p.city ?? "",
    ].filter(Boolean),
  };
}

function formatProductHit(p: Doc<"products">) {
  return {
    id: p._id as string,
    title: p.nameEn,
    description: `${p.sku}${p.nameAr ? ` · ${p.nameAr}` : ""}`,
    href: "/catalogue",
    keywords: [p._id as string, p.sku, p.slug, p.nameEn, p.nameAr].filter(
      Boolean
    ),
  };
}

function formatLeadHit(c: Doc<"contacts">) {
  return {
    id: c._id as string,
    title: c.name,
    description: [c.phoneNumber, c.email, c.type].filter(Boolean).join(" · "),
    href: "/leads",
    keywords: [
      c._id as string,
      c.name,
      c.phoneNumber,
      c.email ?? "",
      c.type ?? "",
    ].filter(Boolean),
  };
}

/**
 * Backoffice command palette: search recent orders, proposals, products, and leads.
 * Bounded reads — scans at most MAX_RECENT_SCAN rows per table.
 */
export const paletteSearch = query({
  args: {
    query: v.string(),
    orderLimit: v.optional(v.number()),
    proposalLimit: v.optional(v.number()),
    productLimit: v.optional(v.number()),
    leadLimit: v.optional(v.number()),
  },
  returns: v.object({
    orders: v.array(hitValidator),
    proposals: v.array(hitValidator),
    products: v.array(hitValidator),
    leads: v.array(hitValidator),
  }),
  handler: async (ctx, args) => {
    await requireStaff(ctx);

    const raw = trimQuery(args.query);
    if (raw.length < 2) {
      return { orders: [], proposals: [], products: [], leads: [] };
    }

    const orderLimit = clampLimit(args.orderLimit, 6, 10);
    const proposalLimit = clampLimit(args.proposalLimit, 6, 10);
    const productLimit = clampLimit(args.productLimit, 6, 10);
    const leadLimit = clampLimit(args.leadLimit, 6, 10);
    const lower = raw.toLowerCase();

    const ordersOut: ReturnType<typeof formatOrderHit>[] = [];
    const seenOrderIds = new Set<string>();

    const pushOrder = async (order: Doc<"orders"> | null) => {
      if (!order || seenOrderIds.has(order._id)) return;
      seenOrderIds.add(order._id);
      const customer = await ctx.db.get(order.customerId);
      ordersOut.push(formatOrderHit(order, customer?.name ?? "Customer"));
    };

    await pushOrder(await tryGetOrderById(ctx, raw));

    const byNumber = await ctx.db
      .query("orders")
      .withIndex("by_order_number", (q) => q.eq("orderNumber", raw))
      .first();
    await pushOrder(byNumber);

    const recentOrders = await ctx.db
      .query("orders")
      .withIndex("by_created")
      .order("desc")
      .take(MAX_RECENT_SCAN);

    for (const order of recentOrders) {
      if (ordersOut.length >= orderLimit) break;
      if (seenOrderIds.has(order._id)) continue;
      const customer = await ctx.db.get(order.customerId);
      const customerName = customer?.name ?? "";
      const match =
        order.orderNumber.toLowerCase().includes(lower) ||
        order.status.toLowerCase().includes(lower) ||
        (order._id as string).toLowerCase().includes(lower) ||
        customerName.toLowerCase().includes(lower) ||
        (customer?.phone?.includes(raw) ?? false) ||
        (customer?.email?.toLowerCase().includes(lower) ?? false);
      if (match) {
        seenOrderIds.add(order._id);
        ordersOut.push(formatOrderHit(order, customerName || "Customer"));
      }
    }

    const proposalsOut: ReturnType<typeof formatProposalHit>[] = [];
    const seenProposalIds = new Set<string>();

    const pushProposal = (p: Doc<"proposals"> | null) => {
      if (!p || seenProposalIds.has(p._id)) return;
      seenProposalIds.add(p._id);
      proposalsOut.push(formatProposalHit(p));
    };

    pushProposal(await tryGetProposalById(ctx, raw));

    const recentProposals = await ctx.db
      .query("proposals")
      .withIndex("by_created")
      .order("desc")
      .take(MAX_RECENT_SCAN);

    for (const p of recentProposals) {
      if (proposalsOut.length >= proposalLimit) break;
      if (seenProposalIds.has(p._id)) continue;
      const match =
        p.customerName.toLowerCase().includes(lower) ||
        p.phoneNumber.includes(raw) ||
        (p.email?.toLowerCase().includes(lower) ?? false) ||
        p.solutionSlug.toLowerCase().includes(lower) ||
        (p.city?.toLowerCase().includes(lower) ?? false) ||
        (p._id as string).toLowerCase().includes(lower);
      if (match) pushProposal(p);
    }

    const productsOut: ReturnType<typeof formatProductHit>[] = [];
    const recentProducts = await ctx.db
      .query("products")
      .order("desc")
      .take(MAX_RECENT_SCAN);

    for (const p of recentProducts) {
      if (productsOut.length >= productLimit) break;
      const match =
        p.nameEn.toLowerCase().includes(lower) ||
        p.nameAr.toLowerCase().includes(lower) ||
        p.sku.toLowerCase().includes(lower) ||
        p.slug.toLowerCase().includes(lower);
      if (match) productsOut.push(formatProductHit(p));
    }

    const leadsOut: ReturnType<typeof formatLeadHit>[] = [];
    const recentLeads = await ctx.db
      .query("contacts")
      .withIndex("by_created")
      .order("desc")
      .take(MAX_RECENT_SCAN);

    for (const c of recentLeads) {
      if (leadsOut.length >= leadLimit) break;
      const match =
        c.name.toLowerCase().includes(lower) ||
        c.phoneNumber.includes(raw) ||
        (c.email?.toLowerCase().includes(lower) ?? false) ||
        (c.type?.toLowerCase().includes(lower) ?? false);
      if (match) leadsOut.push(formatLeadHit(c));
    }

    return {
      orders: ordersOut.slice(0, orderLimit),
      proposals: proposalsOut.slice(0, proposalLimit),
      products: productsOut.slice(0, productLimit),
      leads: leadsOut.slice(0, leadLimit),
    };
  },
});
