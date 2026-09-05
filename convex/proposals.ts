import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalMutation, mutation, query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { requireStaff } from "./lib/auth";
import {
  parseParametersJson,
  stringifyParametersJson,
} from "./lib/parametersJson";

const proposalValidator = v.object({
  _id: v.id("proposals"),
  _creationTime: v.number(),
  solutionSlug: v.string(),
  customerName: v.string(),
  phoneNumber: v.string(),
  email: v.optional(v.string()),
  city: v.optional(v.string()),
  latitude: v.optional(v.number()),
  longitude: v.optional(v.number()),
  isInterested: v.optional(v.boolean()),
  proposalDetailsJson: v.string(),
  legacyId: v.optional(v.number()),
  createdAt: v.number(),
});

const solutionValidator = v.object({
  _id: v.id("solutionProducts"),
  _creationTime: v.number(),
  slug: v.string(),
  name: v.string(),
  currency: v.string(),
  isEnabled: v.boolean(),
  parametersJson: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
});

function withNormalizedParametersJson<T extends { parametersJson: string }>(
  row: T
): T {
  try {
    const normalized = stringifyParametersJson(
      parseParametersJson(row.parametersJson)
    );
    if (normalized === row.parametersJson) return row;
    return { ...row, parametersJson: normalized };
  } catch {
    return row;
  }
}

async function normalizeSolutionParametersRows(ctx: MutationCtx) {
  let fixed = 0;
  const rows = await ctx.db.query("solutionProducts").collect();
  const now = Date.now();
  for (const row of rows) {
    const normalized = stringifyParametersJson(
      parseParametersJson(row.parametersJson)
    );
    if (normalized === row.parametersJson) continue;
    await ctx.db.patch(row._id, {
      parametersJson: normalized,
      updatedAt: now,
    });
    fixed += 1;
  }
  return fixed;
}

export const listSolutions = query({
  args: {},
  returns: v.array(solutionValidator),
  handler: async (ctx) => {
    const rows = await ctx.db.query("solutionProducts").collect();
    return rows.map(withNormalizedParametersJson);
  },
});

export const getSolution = query({
  args: { slug: v.string() },
  returns: v.union(solutionValidator, v.null()),
  handler: async (ctx, args) => {
    const row = await ctx.db
      .query("solutionProducts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    return row ? withNormalizedParametersJson(row) : null;
  },
});

export const upsertSolution = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    currency: v.string(),
    isEnabled: v.boolean(),
    parametersJson: v.string(),
  },
  returns: v.id("solutionProducts"),
  handler: async (ctx, args) => {
    await requireStaff(ctx);
    const parametersJson = stringifyParametersJson(
      parseParametersJson(args.parametersJson)
    );
    const existing = await ctx.db
      .query("solutionProducts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        currency: args.currency,
        isEnabled: args.isEnabled,
        parametersJson,
        updatedAt: now,
      });
      return existing._id;
    }
    return await ctx.db.insert("solutionProducts", {
      slug: args.slug,
      name: args.name,
      currency: args.currency,
      isEnabled: args.isEnabled,
      parametersJson,
      createdAt: now,
      updatedAt: now,
    });
  },
});

/** Repair double-encoded parametersJson left by Neon import. */
export const normalizeAllSolutionParameters = mutation({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    await requireStaff(ctx);
    return await normalizeSolutionParametersRows(ctx);
  },
});

export const normalizeAllSolutionParametersCli = internalMutation({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    return await normalizeSolutionParametersRows(ctx);
  },
});

export const createProposal = mutation({
  args: {
    solutionSlug: v.string(),
    customerName: v.string(),
    phoneNumber: v.string(),
    email: v.optional(v.string()),
    city: v.optional(v.string()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    proposalDetailsJson: v.string(),
  },
  returns: v.id("proposals"),
  handler: async (ctx, args) => {
    if (!args.phoneNumber.trim()) throw new Error("Phone number is required");
    const proposalId = await ctx.db.insert("proposals", {
      solutionSlug: args.solutionSlug,
      customerName: args.customerName.trim(),
      phoneNumber: args.phoneNumber.trim(),
      email: args.email,
      city: args.city,
      latitude: args.latitude,
      longitude: args.longitude,
      proposalDetailsJson: args.proposalDetailsJson,
      createdAt: Date.now(),
    });
    await ctx.scheduler.runAfter(0, internal.email.sendLeadNotification, {
      subject: `New ${args.solutionSlug} proposal from ${args.customerName.trim()}`,
      body: `<p>New proposal</p><ul><li>Solution: ${args.solutionSlug}</li><li>Name: ${args.customerName.trim()}</li><li>Phone: ${args.phoneNumber.trim()}</li><li>Email: ${args.email ?? "-"}</li><li>City: ${args.city ?? "-"}</li></ul>`,
    });
    return proposalId;
  },
});

export const getPublicProposal = query({
  args: { proposalId: v.id("proposals") },
  returns: v.union(proposalValidator, v.null()),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.proposalId);
  },
});

export const listProposals = query({
  args: { solutionSlug: v.optional(v.string()) },
  returns: v.array(proposalValidator),
  handler: async (ctx, args) => {
    await requireStaff(ctx);
    if (args.solutionSlug) {
      return await ctx.db
        .query("proposals")
        .withIndex("by_solution", (q) => q.eq("solutionSlug", args.solutionSlug!))
        .collect();
    }
    return await ctx.db.query("proposals").withIndex("by_created").order("desc").take(300);
  },
});

export const getProposal = query({
  args: { proposalId: v.id("proposals") },
  returns: v.union(proposalValidator, v.null()),
  handler: async (ctx, args) => {
    await requireStaff(ctx);
    return await ctx.db.get(args.proposalId);
  },
});

export const importLegacyProposals = mutation({
  args: {
    rows: v.array(
      v.object({
        legacyId: v.number(),
        solutionSlug: v.string(),
        customerName: v.string(),
        phoneNumber: v.string(),
        email: v.optional(v.string()),
        latitude: v.optional(v.number()),
        longitude: v.optional(v.number()),
        isInterested: v.optional(v.boolean()),
        proposalDetailsJson: v.string(),
        createdAt: v.number(),
      })
    ),
  },
  returns: v.number(),
  handler: async (ctx, args) => {
    await requireStaff(ctx);
    let imported = 0;
    for (const row of args.rows) {
      const existing = await ctx.db
        .query("proposals")
        .withIndex("by_legacy", (q) => q.eq("legacyId", row.legacyId))
        .unique();
      if (existing) continue;
      await ctx.db.insert("proposals", row);
      imported += 1;
    }
    return imported;
  },
});
