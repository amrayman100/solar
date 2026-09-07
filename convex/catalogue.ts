import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import { requireStaff } from "./lib/auth";
import {
  brandValidator,
  categoryValidator,
  familyValidator,
  productValidator,
  shopCategoryChipValidator,
  shopProductCardValidator,
} from "./lib/validators";

function toShopCard(product: Doc<"products">) {
  return {
    _id: product._id,
    slug: product.slug,
    sku: product.sku,
    categoryId: product.categoryId,
    nameEn: product.nameEn,
    nameAr: product.nameAr,
    specEn: product.specEn,
    specAr: product.specAr,
    priceEgp: product.priceEgp,
    priceUnit: product.priceUnit,
    availability: product.availability,
  };
}

function toCategoryChip(category: Doc<"categories">) {
  return {
    _id: category._id,
    slug: category.slug,
    nameEn: category.nameEn,
    nameAr: category.nameAr,
    descriptionEn: category.descriptionEn,
    descriptionAr: category.descriptionAr,
    sortOrder: category.sortOrder,
  };
}

export const listCategories = query({
  args: {},
  returns: v.array(categoryValidator),
  handler: async (ctx) => {
    return await ctx.db.query("categories").withIndex("by_sort").collect();
  },
});

/**
 * Single round-trip shop bootstrap: lean category chips + lean product cards.
 * Pass categorySlug to use the category index instead of loading every product.
 */
export const getShopCatalogue = query({
  args: {
    categorySlug: v.optional(v.string()),
  },
  returns: v.object({
    categories: v.array(shopCategoryChipValidator),
    products: v.array(shopProductCardValidator),
    activeCategory: v.union(shopCategoryChipValidator, v.null()),
  }),
  handler: async (ctx, args) => {
    const categories = (
      await ctx.db.query("categories").withIndex("by_sort").collect()
    ).map(toCategoryChip);

    if (args.categorySlug) {
      const category = await ctx.db
        .query("categories")
        .withIndex("by_slug", (q) => q.eq("slug", args.categorySlug!))
        .unique();
      if (!category) {
        return { categories, products: [], activeCategory: null };
      }
      const products = (
        await ctx.db
          .query("products")
          .withIndex("by_category_published", (q) =>
            q.eq("categoryId", category._id).eq("isPublished", true)
          )
          .collect()
      ).map(toShopCard);
      return {
        categories,
        products,
        activeCategory: toCategoryChip(category),
      };
    }

    const products = (
      await ctx.db
        .query("products")
        .withIndex("by_published", (q) => q.eq("isPublished", true))
        .collect()
    ).map(toShopCard);

    return { categories, products, activeCategory: null };
  },
});

export const listBrands = query({
  args: {},
  returns: v.array(brandValidator),
  handler: async (ctx) => {
    return await ctx.db.query("brands").collect();
  },
});

export const listFamilies = query({
  args: { categoryId: v.optional(v.id("categories")) },
  returns: v.array(familyValidator),
  handler: async (ctx, args) => {
    if (args.categoryId) {
      return await ctx.db
        .query("productFamilies")
        .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId!))
        .collect();
    }
    return await ctx.db.query("productFamilies").collect();
  },
});

export const getCategoryBySlug = query({
  args: { slug: v.string() },
  returns: v.union(categoryValidator, v.null()),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const listPublishedByCategory = query({
  args: { categorySlug: v.string() },
  returns: v.array(shopProductCardValidator),
  handler: async (ctx, args) => {
    const category = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.categorySlug))
      .unique();
    if (!category) return [];
    return (
      await ctx.db
        .query("products")
        .withIndex("by_category_published", (q) =>
          q.eq("categoryId", category._id).eq("isPublished", true)
        )
        .collect()
    ).map(toShopCard);
  },
});

export const getProductBySlug = query({
  args: { slug: v.string() },
  returns: v.union(productValidator, v.null()),
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!product || !product.isPublished) return null;
    return product;
  },
});

export const listPublished = query({
  args: {},
  returns: v.array(shopProductCardValidator),
  handler: async (ctx) => {
    return (
      await ctx.db
        .query("products")
        .withIndex("by_published", (q) => q.eq("isPublished", true))
        .collect()
    ).map(toShopCard);
  },
});

export const listAllProducts = query({
  args: {},
  returns: v.array(productValidator),
  handler: async (ctx) => {
    await requireStaff(ctx);
    return await ctx.db.query("products").collect();
  },
});

export const updateProduct = mutation({
  args: {
    productId: v.id("products"),
    priceEgp: v.optional(v.number()),
    stockQty: v.optional(v.number()),
    availability: v.optional(
      v.union(
        v.literal("in_stock"),
        v.literal("on_request"),
        v.literal("quote_only")
      )
    ),
    isPublished: v.optional(v.boolean()),
    nameEn: v.optional(v.string()),
    nameAr: v.optional(v.string()),
    specEn: v.optional(v.string()),
    specAr: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireStaff(ctx);
    const product = await ctx.db.get(args.productId);
    if (!product) throw new Error("Product not found");
    await ctx.db.patch(args.productId, {
      ...(args.priceEgp !== undefined ? { priceEgp: args.priceEgp } : {}),
      ...(args.stockQty !== undefined ? { stockQty: args.stockQty } : {}),
      ...(args.availability !== undefined ? { availability: args.availability } : {}),
      ...(args.isPublished !== undefined ? { isPublished: args.isPublished } : {}),
      ...(args.nameEn !== undefined ? { nameEn: args.nameEn } : {}),
      ...(args.nameAr !== undefined ? { nameAr: args.nameAr } : {}),
      ...(args.specEn !== undefined ? { specEn: args.specEn } : {}),
      ...(args.specAr !== undefined ? { specAr: args.specAr } : {}),
      updatedAt: Date.now(),
    });
    return null;
  },
});
