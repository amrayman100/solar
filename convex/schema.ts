import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    role: v.union(
      v.literal("admin"),
      v.literal("staff"),
      v.literal("customer")
    ),
    phone: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  brands: defineTable({
    slug: v.string(),
    name: v.string(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),

  categories: defineTable({
    slug: v.string(),
    nameEn: v.string(),
    nameAr: v.string(),
    descriptionEn: v.optional(v.string()),
    descriptionAr: v.optional(v.string()),
    sortOrder: v.number(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]).index("by_sort", ["sortOrder"]),

  productFamilies: defineTable({
    slug: v.string(),
    categoryId: v.id("categories"),
    brandId: v.optional(v.id("brands")),
    nameEn: v.string(),
    nameAr: v.string(),
    summaryEn: v.optional(v.string()),
    summaryAr: v.optional(v.string()),
    sortOrder: v.number(),
    createdAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId"]),

  products: defineTable({
    sku: v.string(),
    slug: v.string(),
    categoryId: v.id("categories"),
    familyId: v.optional(v.id("productFamilies")),
    brandId: v.optional(v.id("brands")),
    nameEn: v.string(),
    nameAr: v.string(),
    specEn: v.string(),
    specAr: v.string(),
    priceEgp: v.optional(v.number()),
    priceUnit: v.union(
      v.literal("each"),
      v.literal("per_watt"),
      v.literal("per_metre"),
      v.literal("per_kw")
    ),
    availability: v.union(
      v.literal("in_stock"),
      v.literal("on_request"),
      v.literal("quote_only")
    ),
    stockQty: v.number(),
    warrantyYears: v.optional(v.number()),
    tags: v.array(v.string()),
    isPublished: v.boolean(),
    photoStorageId: v.optional(v.id("_storage")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_sku", ["sku"])
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId"])
    .index("by_category_published", ["categoryId", "isPublished"])
    .index("by_family", ["familyId"])
    .index("by_published", ["isPublished"]),

  customers: defineTable({
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    profileId: v.optional(v.id("profiles")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_phone", ["phone"])
    .index("by_email", ["email"])
    .index("by_profile", ["profileId"]),

  orders: defineTable({
    orderNumber: v.string(),
    customerId: v.id("customers"),
    status: v.union(
      v.literal("new"),
      v.literal("quoted"),
      v.literal("confirmed"),
      v.literal("fulfilled"),
      v.literal("cancelled")
    ),
    paymentStatus: v.union(
      v.literal("unpaid"),
      v.literal("partial"),
      v.literal("paid")
    ),
    paymentMethod: v.optional(
      v.union(
        v.literal("instapay"),
        v.literal("bank_transfer"),
        v.literal("cash"),
        v.literal("other")
      )
    ),
    locale: v.union(v.literal("en"), v.literal("ar")),
    remarks: v.optional(v.string()),
    subtotalExVat: v.number(),
    vatAmount: v.number(),
    totalIncVat: v.number(),
    stockDecremented: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_customer", ["customerId"])
    .index("by_created", ["createdAt"])
    .index("by_order_number", ["orderNumber"]),

  orderItems: defineTable({
    orderId: v.id("orders"),
    productId: v.id("products"),
    sku: v.string(),
    nameEn: v.string(),
    nameAr: v.string(),
    quantity: v.number(),
    unitPriceEgp: v.optional(v.number()),
    priceUnit: v.union(
      v.literal("each"),
      v.literal("per_watt"),
      v.literal("per_metre"),
      v.literal("per_kw")
    ),
    lineTotalEgp: v.optional(v.number()),
    notes: v.optional(v.string()),
  }).index("by_order", ["orderId"]),

  solutionProducts: defineTable({
    slug: v.string(),
    name: v.string(),
    currency: v.string(),
    isEnabled: v.boolean(),
    parametersJson: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  proposals: defineTable({
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
  })
    .index("by_solution", ["solutionSlug"])
    .index("by_phone", ["phoneNumber"])
    .index("by_created", ["createdAt"])
    .index("by_legacy", ["legacyId"]),

  contacts: defineTable({
    name: v.string(),
    phoneNumber: v.string(),
    email: v.optional(v.string()),
    type: v.optional(v.string()),
    message: v.optional(v.string()),
    legacyId: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_type", ["type"])
    .index("by_created", ["createdAt"])
    .index("by_legacy", ["legacyId"]),

  brandAmbassadors: defineTable({
    name: v.string(),
    phoneNumber: v.string(),
    email: v.optional(v.string()),
    legacyId: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_created", ["createdAt"])
    .index("by_legacy", ["legacyId"]),
});
