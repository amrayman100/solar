import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { requireStaff } from "./lib/auth";

const contactValidator = v.object({
  _id: v.id("contacts"),
  _creationTime: v.number(),
  name: v.string(),
  phoneNumber: v.string(),
  email: v.optional(v.string()),
  type: v.optional(v.string()),
  message: v.optional(v.string()),
  legacyId: v.optional(v.number()),
  createdAt: v.number(),
});

const ambassadorValidator = v.object({
  _id: v.id("brandAmbassadors"),
  _creationTime: v.number(),
  name: v.string(),
  phoneNumber: v.string(),
  email: v.optional(v.string()),
  legacyId: v.optional(v.number()),
  createdAt: v.number(),
});

export const createContact = mutation({
  args: {
    name: v.string(),
    phoneNumber: v.string(),
    email: v.optional(v.string()),
    type: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  returns: v.id("contacts"),
  handler: async (ctx, args) => {
    const contactId = await ctx.db.insert("contacts", {
      ...args,
      createdAt: Date.now(),
    });
    await ctx.scheduler.runAfter(0, internal.email.sendLeadNotification, {
      subject: `New contact from ${args.name}`,
      body: `<p>${args.message ?? "New contact request"}</p><ul><li>Name: ${args.name}</li><li>Phone: ${args.phoneNumber}</li><li>Email: ${args.email ?? "-"}</li><li>Type: ${args.type ?? "-"}</li></ul>`,
    });
    return contactId;
  },
});

export const listContacts = query({
  args: {},
  returns: v.array(contactValidator),
  handler: async (ctx) => {
    await requireStaff(ctx);
    return await ctx.db.query("contacts").withIndex("by_created").order("desc").take(200);
  },
});

export const createAmbassador = mutation({
  args: {
    name: v.string(),
    phoneNumber: v.string(),
    email: v.optional(v.string()),
  },
  returns: v.id("brandAmbassadors"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("brandAmbassadors", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const listAmbassadors = query({
  args: {},
  returns: v.array(ambassadorValidator),
  handler: async (ctx) => {
    await requireStaff(ctx);
    return await ctx.db.query("brandAmbassadors").withIndex("by_created").order("desc").take(100);
  },
});

export const importLegacyLeads = mutation({
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
    await requireStaff(ctx);
    let contacts = 0;
    let ambassadors = 0;
    for (const row of args.contacts) {
      await ctx.db.insert("contacts", row);
      contacts += 1;
    }
    for (const row of args.ambassadors) {
      await ctx.db.insert("brandAmbassadors", row);
      ambassadors += 1;
    }
    return { contacts, ambassadors };
  },
});
