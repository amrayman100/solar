import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { getCurrentUserOrNull, requireStaff } from "./lib/auth";
import {
  customerValidator,
  localeValidator,
  orderItemValidator,
  orderStatusValidator,
  orderValidator,
  paymentMethodValidator,
  paymentStatusValidator,
} from "./lib/validators";
import type { Id } from "./_generated/dataModel";

const VAT_RATE = 0.14;

const cartItemValidator = v.object({
  productId: v.id("products"),
  quantity: v.number(),
  notes: v.optional(v.string()),
});

async function upsertCustomer(
  ctx: MutationCtx,
  args: {
    name: string;
    phone: string;
    email?: string;
    profileId?: Id<"profiles">;
  }
): Promise<Id<"customers">> {
  const existing = await ctx.db
    .query("customers")
    .withIndex("by_phone", (q) => q.eq("phone", args.phone))
    .unique();
  const now = Date.now();
  if (existing) {
    await ctx.db.patch(existing._id, {
      name: args.name || existing.name,
      email: args.email ?? existing.email,
      profileId: args.profileId ?? existing.profileId,
      updatedAt: now,
    });
    return existing._id;
  }
  return await ctx.db.insert("customers", {
    name: args.name,
    phone: args.phone,
    email: args.email,
    profileId: args.profileId,
    createdAt: now,
    updatedAt: now,
  });
}

export const create = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    remarks: v.optional(v.string()),
    locale: localeValidator,
    items: v.array(cartItemValidator),
  },
  returns: v.object({
    orderId: v.id("orders"),
    orderNumber: v.string(),
  }),
  handler: async (ctx, args) => {
    if (args.items.length === 0) throw new Error("Cart is empty");
    if (!args.phone.trim()) throw new Error("Phone number is required");
    if (!args.name.trim()) throw new Error("Name is required");

    const profile = await getCurrentUserOrNull(ctx);
    const customerId = await upsertCustomer(ctx, {
      name: args.name.trim(),
      phone: args.phone.trim(),
      email: args.email?.trim() || undefined,
      profileId: profile?._id,
    });

    let subtotalExVat = 0;
    const resolved = [];
    for (const item of args.items) {
      if (item.quantity <= 0) throw new Error("Quantity must be positive");
      const product = await ctx.db.get(item.productId);
      if (!product || !product.isPublished) {
        throw new Error("Product not found");
      }
      const lineTotal =
        product.priceEgp !== undefined
          ? product.priceEgp * item.quantity
          : undefined;
      if (lineTotal !== undefined) subtotalExVat += lineTotal;
      resolved.push({ product, item, lineTotal });
    }

    const vatAmount = Math.round(subtotalExVat * VAT_RATE * 100) / 100;
    const totalIncVat = Math.round((subtotalExVat + vatAmount) * 100) / 100;
    const now = Date.now();
    const orderNumber = `BE-${now.toString(36).toUpperCase()}`;

    const orderId = await ctx.db.insert("orders", {
      orderNumber,
      customerId,
      status: "new",
      paymentStatus: "unpaid",
      locale: args.locale,
      remarks: args.remarks,
      subtotalExVat,
      vatAmount,
      totalIncVat,
      stockDecremented: false,
      createdAt: now,
      updatedAt: now,
    });

    for (const row of resolved) {
      await ctx.db.insert("orderItems", {
        orderId,
        productId: row.product._id,
        sku: row.product.sku,
        nameEn: row.product.nameEn,
        nameAr: row.product.nameAr,
        quantity: row.item.quantity,
        unitPriceEgp: row.product.priceEgp,
        priceUnit: row.product.priceUnit,
        lineTotalEgp: row.lineTotal,
        notes: row.item.notes,
      });
    }

    await ctx.scheduler.runAfter(0, internal.email.sendLeadNotification, {
      subject: `New shop order ${orderNumber}`,
      body: `<p>Order ${orderNumber}</p><ul><li>Name: ${args.name.trim()}</li><li>Phone: ${args.phone.trim()}</li><li>Total inc VAT: ${totalIncVat} EGP</li></ul>`,
    });

    return { orderId, orderNumber };
  },
});

export const list = query({
  args: { status: v.optional(orderStatusValidator) },
  returns: v.array(
    v.object({
      order: orderValidator,
      customer: customerValidator,
    })
  ),
  handler: async (ctx, args) => {
    await requireStaff(ctx);
    const orders = args.status
      ? await ctx.db
          .query("orders")
          .withIndex("by_status", (q) => q.eq("status", args.status!))
          .collect()
      : await ctx.db.query("orders").withIndex("by_created").order("desc").take(200);

    const result = [];
    for (const order of orders.sort((a, b) => b.createdAt - a.createdAt)) {
      const customer = await ctx.db.get(order.customerId);
      if (customer) result.push({ order, customer });
    }
    return result;
  },
});

export const get = query({
  args: { orderId: v.id("orders") },
  returns: v.union(
    v.object({
      order: orderValidator,
      customer: customerValidator,
      items: v.array(orderItemValidator),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    await requireStaff(ctx);
    const order = await ctx.db.get(args.orderId);
    if (!order) return null;
    const customer = await ctx.db.get(order.customerId);
    if (!customer) return null;
    const items = await ctx.db
      .query("orderItems")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .collect();
    return { order, customer, items };
  },
});

export const getByNumber = query({
  args: { orderNumber: v.string() },
  returns: v.union(
    v.object({
      order: orderValidator,
      items: v.array(orderItemValidator),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_order_number", (q) => q.eq("orderNumber", args.orderNumber))
      .unique();
    if (!order) return null;
    const items = await ctx.db
      .query("orderItems")
      .withIndex("by_order", (q) => q.eq("orderId", order._id))
      .collect();
    return { order, items };
  },
});

export const listMine = query({
  args: {},
  returns: v.array(orderValidator),
  handler: async (ctx) => {
    const profile = await getCurrentUserOrNull(ctx);
    if (!profile) return [];
    const customer = await ctx.db
      .query("customers")
      .withIndex("by_profile", (q) => q.eq("profileId", profile._id))
      .unique();
    if (!customer) return [];
    return await ctx.db
      .query("orders")
      .withIndex("by_customer", (q) => q.eq("customerId", customer._id))
      .collect();
  },
});

export const updateStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.optional(orderStatusValidator),
    paymentStatus: v.optional(paymentStatusValidator),
    paymentMethod: v.optional(paymentMethodValidator),
    remarks: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireStaff(ctx);
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found");

    const nextStatus = args.status ?? order.status;
    let stockDecremented = order.stockDecremented;

    if (nextStatus === "confirmed" && !order.stockDecremented) {
      const items = await ctx.db
        .query("orderItems")
        .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
        .collect();
      for (const item of items) {
        const product = await ctx.db.get(item.productId);
        if (!product) continue;
        await ctx.db.patch(product._id, {
          stockQty: Math.max(0, product.stockQty - item.quantity),
          updatedAt: Date.now(),
        });
      }
      stockDecremented = true;
    }

    if (nextStatus === "cancelled" && order.stockDecremented) {
      const items = await ctx.db
        .query("orderItems")
        .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
        .collect();
      for (const item of items) {
        const product = await ctx.db.get(item.productId);
        if (!product) continue;
        await ctx.db.patch(product._id, {
          stockQty: product.stockQty + item.quantity,
          updatedAt: Date.now(),
        });
      }
      stockDecremented = false;
    }

    await ctx.db.patch(args.orderId, {
      status: nextStatus,
      paymentStatus: args.paymentStatus ?? order.paymentStatus,
      paymentMethod: args.paymentMethod ?? order.paymentMethod,
      remarks: args.remarks ?? order.remarks,
      stockDecremented,
      updatedAt: Date.now(),
    });
    return null;
  },
});
