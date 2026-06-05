import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const issues = pgTable("issues", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description").notNull(),

  status: varchar("status", { length: 50 })
    .default("OPEN")
    .notNull(),

  priority: varchar("priority", { length: 50 })
    .default("MEDIUM")
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),
});