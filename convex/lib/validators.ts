import { v } from "convex/values";

export const roleValidator = v.union(
  v.literal("admin"),
  v.literal("staff"),
  v.literal("customer")
);

export const priceUnitValidator = v.union(
  v.literal("each"),
  v.literal("per_watt"),
  v.literal("per_metre"),
  v.literal("per_kw")
);

export const availabilityValidator = v.union(
  v.literal("in_stock"),
  v.literal("on_request"),
  v.literal("quote_only")
);

export const orderStatusValidator = v.union(
  v.literal("new"),
  v.literal("quoted"),
  v.literal("confirmed"),
  v.literal("fulfilled"),
  v.literal("cancelled")
);

export const paymentStatusValidator = v.union(
  v.literal("unpaid"),
  v.literal("partial"),
  v.literal("paid")
);

export const paymentMethodValidator = v.union(
  v.literal("instapay"),
  v.literal("bank_transfer"),
  v.literal("cash"),
  v.literal("other")
);

export const localeValidator = v.union(v.literal("en"), v.literal("ar"));

export const brandValidator = v.object({
  _id: v.id("brands"),
  _creationTime: v.number(),
  slug: v.string(),
  name: v.string(),
  createdAt: v.number(),
});

export const categoryValidator = v.object({
  _id: v.id("categories"),
  _creationTime: v.number(),
  slug: v.string(),
  nameEn: v.string(),
  nameAr: v.string(),
  descriptionEn: v.optional(v.string()),
  descriptionAr: v.optional(v.string()),
  sortOrder: v.number(),
  createdAt: v.number(),
});

export const familyValidator = v.object({
  _id: v.id("productFamilies"),
  _creationTime: v.number(),
  slug: v.string(),
  categoryId: v.id("categories"),
  brandId: v.optional(v.id("brands")),
  nameEn: v.string(),
  nameAr: v.string(),
  summaryEn: v.optional(v.string()),
  summaryAr: v.optional(v.string()),
  sortOrder: v.number(),
  createdAt: v.number(),
});

export const productValidator = v.object({
  _id: v.id("products"),
  _creationTime: v.number(),
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
  priceUnit: priceUnitValidator,
  availability: availabilityValidator,
  stockQty: v.number(),
  warrantyYears: v.optional(v.number()),
  tags: v.array(v.string()),
  isPublished: v.boolean(),
  photoStorageId: v.optional(v.id("_storage")),
  createdAt: v.number(),
  updatedAt: v.number(),
});

/** Lean fields for shop grid cards — keeps catalogue payloads small. */
export const shopProductCardValidator = v.object({
  _id: v.id("products"),
  slug: v.string(),
  sku: v.string(),
  categoryId: v.id("categories"),
  nameEn: v.string(),
  nameAr: v.string(),
  specEn: v.string(),
  specAr: v.string(),
  priceEgp: v.optional(v.number()),
  priceUnit: priceUnitValidator,
  availability: availabilityValidator,
});

export const shopCategoryChipValidator = v.object({
  _id: v.id("categories"),
  slug: v.string(),
  nameEn: v.string(),
  nameAr: v.string(),
  descriptionEn: v.optional(v.string()),
  descriptionAr: v.optional(v.string()),
  sortOrder: v.number(),
});

export const customerValidator = v.object({
  _id: v.id("customers"),
  _creationTime: v.number(),
  name: v.string(),
  phone: v.string(),
  email: v.optional(v.string()),
  profileId: v.optional(v.id("profiles")),
  createdAt: v.number(),
  updatedAt: v.number(),
});

export const orderValidator = v.object({
  _id: v.id("orders"),
  _creationTime: v.number(),
  orderNumber: v.string(),
  customerId: v.id("customers"),
  status: orderStatusValidator,
  paymentStatus: paymentStatusValidator,
  paymentMethod: v.optional(paymentMethodValidator),
  locale: localeValidator,
  remarks: v.optional(v.string()),
  subtotalExVat: v.number(),
  vatAmount: v.number(),
  totalIncVat: v.number(),
  stockDecremented: v.boolean(),
  createdAt: v.number(),
  updatedAt: v.number(),
});

export const orderItemValidator = v.object({
  _id: v.id("orderItems"),
  _creationTime: v.number(),
  orderId: v.id("orders"),
  productId: v.id("products"),
  sku: v.string(),
  nameEn: v.string(),
  nameAr: v.string(),
  quantity: v.number(),
  unitPriceEgp: v.optional(v.number()),
  priceUnit: priceUnitValidator,
  lineTotalEgp: v.optional(v.number()),
  notes: v.optional(v.string()),
});
