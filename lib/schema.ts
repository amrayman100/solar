import {
  boolean,
  date,
  jsonb,
  numeric,
  pgSchema,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const productTable = pgTable("products", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  currency: text("currency").notNull(),
  isEnabled: boolean("is_enabled").notNull(),
  createdAt: date("created_at"),
  updatedAt: date("updated_at"),
  createdBy: text("created_by"),
  updatedBy: text("updated_by"),
  parameters: jsonb("parameters"),
});

export const productProposalTable = pgTable("product_proposals", {
  id: serial("id").primaryKey().notNull(),
  productId: serial("product_id"),
  name: text("name").notNull(),
  createdAt: date("created_at"),
  createdBy: text("created_by"),
  addressLatitude: numeric("address_latitude"),
  addressLongitude: numeric("address_longitude"),
  emailAddress: text("email_address").notNull(),
  phoneNumber: text("phone_number").notNull(),
  proposalDetails: jsonb("proposal_details").notNull(),
});
