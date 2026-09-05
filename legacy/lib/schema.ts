import {
  boolean,
  date,
  jsonb,
  numeric,
  pgSchema,
  pgTable,
  serial,
  text,
  primaryKey,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

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
  emailAddress: text("email_address"),
  phoneNumber: text("phone_number").notNull(),
  isInterested: boolean("is_interested"),
  proposalDetails: jsonb("proposal_details").notNull(),
});

export const users = pgTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  passwordHash: text("password_hash"),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId"),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_token",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const contactTable = pgTable("contact", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  createdAt: date("created_at"),
  createdBy: text("created_by"),
  emailAddress: text("email_address"),
  type: text("type"),
  contactDesc: text("conatct_desc"),
  phoneNumber: text("phone_number").notNull(),
});

export const brandAmbassador = pgTable("brand_ambassador", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  createdAt: date("created_at"),
  createdBy: text("created_by"),
  emailAddress: text("email_address"),
  phoneNumber: text("phone_number").notNull(),
});
