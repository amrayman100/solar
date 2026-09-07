import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import {
  parseParametersJson,
  stringifyParametersJson,
} from "./lib/parametersJson";

export const importSolutions = internalMutation({
  args: {
    rows: v.array(
      v.object({
        slug: v.string(),
        name: v.string(),
        currency: v.string(),
        isEnabled: v.boolean(),
        parametersJson: v.string(),
      })
    ),
  },
  returns: v.number(),
  handler: async (ctx, args) => {
    const now = Date.now();
    let upserted = 0;
    for (const row of args.rows) {
      const parametersJson = stringifyParametersJson(
        parseParametersJson(row.parametersJson)
      );
      const existing = await ctx.db
        .query("solutionProducts")
        .withIndex("by_slug", (q) => q.eq("slug", row.slug))
        .unique();
      if (existing) {
        await ctx.db.patch(existing._id, {
          name: row.name,
          currency: row.currency,
          isEnabled: row.isEnabled,
          parametersJson,
          updatedAt: now,
        });
      } else {
        await ctx.db.insert("solutionProducts", {
          slug: row.slug,
          name: row.name,
          currency: row.currency,
          isEnabled: row.isEnabled,
          parametersJson,
          createdAt: now,
          updatedAt: now,
        });
      }
      upserted += 1;
    }
    return upserted;
  },
});

export const importProposals = internalMutation({
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

export const importLeads = internalMutation({
  args: {
    contacts: v.array(
      v.object({
        legacyId: v.number(),
        name: v.string(),
        phoneNumber: v.string(),
        email: v.optional(v.string()),
        type: v.optional(v.string()),
        message: v.optional(v.string()),
        createdAt: v.number(),
      })
    ),
    ambassadors: v.array(
      v.object({
        legacyId: v.number(),
        name: v.string(),
        phoneNumber: v.string(),
        email: v.optional(v.string()),
        createdAt: v.number(),
      })
    ),
  },
  returns: v.object({ contacts: v.number(), ambassadors: v.number() }),
  handler: async (ctx, args) => {
    let contacts = 0;
    let ambassadors = 0;
    for (const row of args.contacts) {
      const existing = await ctx.db
        .query("contacts")
        .withIndex("by_legacy", (q) => q.eq("legacyId", row.legacyId))
        .unique();
      if (existing) continue;
      await ctx.db.insert("contacts", row);
      contacts += 1;
    }
    for (const row of args.ambassadors) {
      const existing = await ctx.db
        .query("brandAmbassadors")
        .withIndex("by_legacy", (q) => q.eq("legacyId", row.legacyId))
        .unique();
      if (existing) continue;
      await ctx.db.insert("brandAmbassadors", row);
      ambassadors += 1;
    }
    return { contacts, ambassadors };
  },
});
