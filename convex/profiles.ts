import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrNull } from "./lib/auth";

const profileValidator = v.object({
  _id: v.id("profiles"),
  _creationTime: v.number(),
  tokenIdentifier: v.string(),
  email: v.string(),
  name: v.optional(v.string()),
  role: v.union(v.literal("admin"), v.literal("staff"), v.literal("customer")),
  phone: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

export const me = query({
  args: {},
  returns: v.union(profileValidator, v.null()),
  handler: async (ctx) => {
    return await getCurrentUserOrNull(ctx);
  },
});

export const ensure = mutation({
  args: {},
  returns: v.id("profiles"),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        email: identity.email ?? existing.email,
        name: identity.name ?? existing.name,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    const email = identity.email ?? "";
    const existingByEmail = email
      ? await ctx.db
          .query("profiles")
          .withIndex("by_email", (q) => q.eq("email", email))
          .unique()
      : null;

    const isFirstUser =
      (await ctx.db.query("profiles").take(2)).length === 0;

    if (existingByEmail) {
      await ctx.db.patch(existingByEmail._id, {
        tokenIdentifier: identity.tokenIdentifier,
        name: identity.name ?? existingByEmail.name,
        updatedAt: Date.now(),
      });
      return existingByEmail._id;
    }

    return await ctx.db.insert("profiles", {
      tokenIdentifier: identity.tokenIdentifier,
      email,
      name: identity.name ?? undefined,
      role: isFirstUser ? "admin" : "customer",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});
