import { v } from "convex/values";
import { internalMutation, mutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";
import { requireStaff } from "./lib/auth";
import {
  seedBrands,
  seedCategories,
  seedFamilies,
  seedProducts,
} from "./catalogueData";
import gridTiedDefaults from "./defaults/grid-tied.json";
import offGridDefaults from "./defaults/off-grid.json";
import {
  stringifyParametersJson,
} from "./lib/parametersJson";

async function runCatalogueSeed(ctx: MutationCtx, force?: boolean) {
    const existing = await ctx.db.query("products").take(1);
    if (existing.length > 0 && !force) {
      throw new Error("Catalogue already seeded. Pass force: true to replace.");
    }

    if (force) {
      for (const row of await ctx.db.query("products").collect()) {
        await ctx.db.delete(row._id);
      }
      for (const row of await ctx.db.query("productFamilies").collect()) {
        await ctx.db.delete(row._id);
      }
      for (const row of await ctx.db.query("categories").collect()) {
        await ctx.db.delete(row._id);
      }
      for (const row of await ctx.db.query("brands").collect()) {
        await ctx.db.delete(row._id);
      }
    }

    const now = Date.now();
    const brandIdBySlug = new Map<string, Id<"brands">>();
    for (const brand of seedBrands) {
      const id = await ctx.db.insert("brands", {
        slug: brand.slug,
        name: brand.name,
        createdAt: now,
      });
      brandIdBySlug.set(brand.slug, id);
    }

    const categoryIdBySlug = new Map<string, Id<"categories">>();
    for (const category of seedCategories) {
      const id = await ctx.db.insert("categories", {
        slug: category.slug,
        nameEn: category.nameEn,
        nameAr: category.nameAr,
        descriptionEn: category.descriptionEn,
        descriptionAr: category.descriptionAr,
        sortOrder: category.sortOrder,
        createdAt: now,
      });
      categoryIdBySlug.set(category.slug, id);
    }

    const familyIdBySlug = new Map<string, Id<"productFamilies">>();
    for (const family of seedFamilies) {
      const categoryId = categoryIdBySlug.get(family.categorySlug);
      if (!categoryId) throw new Error(`Missing category ${family.categorySlug}`);
      const id = await ctx.db.insert("productFamilies", {
        slug: family.slug,
        categoryId,
        brandId: family.brandSlug ? brandIdBySlug.get(family.brandSlug) : undefined,
        nameEn: family.nameEn,
        nameAr: family.nameAr,
        summaryEn: family.summaryEn,
        summaryAr: family.summaryAr,
        sortOrder: family.sortOrder,
        createdAt: now,
      });
      familyIdBySlug.set(family.slug, id);
    }

    for (const product of seedProducts) {
      const categoryId = categoryIdBySlug.get(product.categorySlug);
      if (!categoryId) throw new Error(`Missing category ${product.categorySlug}`);
      await ctx.db.insert("products", {
        sku: product.sku,
        slug: product.slug,
        categoryId,
        familyId: product.familySlug
          ? familyIdBySlug.get(product.familySlug)
          : undefined,
        brandId: product.brandSlug ? brandIdBySlug.get(product.brandSlug) : undefined,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        specEn: product.specEn,
        specAr: product.specAr,
        priceEgp: product.priceEgp,
        priceUnit: product.priceUnit,
        availability: product.availability,
        stockQty: product.stockQty,
        warrantyYears: product.warrantyYears,
        tags: product.tags,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      });
    }

    return {
      brands: seedBrands.length,
      categories: seedCategories.length,
      families: seedFamilies.length,
      products: seedProducts.length,
    };
}

const catalogueReturns = v.object({
  brands: v.number(),
  categories: v.number(),
  families: v.number(),
  products: v.number(),
});

export const seedCatalogue = mutation({
  args: { force: v.optional(v.boolean()) },
  returns: catalogueReturns,
  handler: async (ctx, args) => {
    await requireStaff(ctx);
    return await runCatalogueSeed(ctx, args.force);
  },
});

export const seedCatalogueCli = internalMutation({
  args: { force: v.optional(v.boolean()) },
  returns: catalogueReturns,
  handler: async (ctx, args) => {
    return await runCatalogueSeed(ctx, args.force);
  },
});

const defaultSolutions = [
  {
    slug: "grid-tied",
    name: "Grid-Tied",
    currency: "EGP",
    parametersJson: stringifyParametersJson(
      (gridTiedDefaults as { parameters?: unknown }).parameters ?? gridTiedDefaults
    ),
  },
  {
    slug: "off-grid",
    name: "Off-Grid",
    currency: "EGP",
    parametersJson: stringifyParametersJson(offGridDefaults),
  },
  {
    slug: "solar-irrigation",
    name: "Solar Irrigation",
    currency: "EGP",
    parametersJson: stringifyParametersJson({ pricePerkW: 17000 }),
  },
  {
    slug: "solar-heating",
    name: "Solar Heating",
    currency: "EGP",
    parametersJson: stringifyParametersJson({
      houseHoldHeaters: [
        { brand: "300l", price: 75000, maxNumberOfRooms: 4, litres: 180 },
        { brand: "300l", price: 95000, maxNumberOfRooms: 7, litres: 300 },
      ],
      poolHeaters: [
        { brand: "Heat Master I", price: 297500, minVolume: 15, maxVolume: 30 },
        { brand: "Heat Master II X20-26", price: 493750, minVolume: 30, maxVolume: 45 },
        { brand: "Heat Master III X20-40T", price: 618750, minVolume: 45, maxVolume: 80 },
        { brand: "Heat Master IV", price: 847500, minVolume: 80, maxVolume: 120 },
        { brand: "Heat Master V", price: 1643750, minVolume: 80, maxVolume: 120 },
      ],
    }),
  },
  {
    slug: "ev",
    name: "EV Charging",
    currency: "EGP",
    parametersJson: stringifyParametersJson({
      chargers: [
        { power: 7, price: 27000 },
        { power: 11, price: 29000 },
        { power: 22, price: 29000 },
      ],
    }),
  },
  {
    slug: "construction",
    name: "Bolt Construction",
    currency: "EGP",
    parametersJson: stringifyParametersJson({
      homeFinishingPerM2: { basic: 6000, premiuim: 10000, luxury: 14000 },
    }),
  },
  {
    slug: "whole-sale",
    name: "Wholesale",
    currency: "EGP",
    parametersJson: stringifyParametersJson({}),
  },
] as const;

export const seedSolutions = mutation({
  args: { force: v.optional(v.boolean()) },
  returns: v.number(),
  handler: async (ctx, args) => {
    await requireStaff(ctx);
    return await runSolutionsSeed(ctx, args.force);
  },
});

export const seedSolutionsCli = internalMutation({
  args: { force: v.optional(v.boolean()) },
  returns: v.number(),
  handler: async (ctx, args) => {
    return await runSolutionsSeed(ctx, args.force);
  },
});

async function runSolutionsSeed(ctx: MutationCtx, force?: boolean) {
  let upserted = 0;
  const now = Date.now();
  for (const solution of defaultSolutions) {
    const existing = await ctx.db
      .query("solutionProducts")
      .withIndex("by_slug", (q) => q.eq("slug", solution.slug))
      .unique();
    if (existing && !force) {
      continue;
    }
    if (existing) {
      await ctx.db.patch(existing._id, {
        name: solution.name,
        currency: solution.currency,
        isEnabled: true,
        parametersJson: solution.parametersJson,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("solutionProducts", {
        slug: solution.slug,
        name: solution.name,
        currency: solution.currency,
        isEnabled: true,
        parametersJson: solution.parametersJson,
        createdAt: now,
        updatedAt: now,
      });
    }
    upserted += 1;
  }
  return upserted;
}
