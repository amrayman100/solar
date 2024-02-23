import {
  boolean,
  date,
  jsonb,
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
