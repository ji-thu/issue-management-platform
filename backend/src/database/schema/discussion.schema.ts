import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { issues } from "./issue.schema";

export const discussions = pgTable("discussions", {
  id: uuid("id").defaultRandom().primaryKey(),

  issueId: uuid("issue_id")
    .references(() => issues.id)
    .notNull(),

  message: text("message").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});