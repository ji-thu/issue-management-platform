import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { issues } from "./issue.schema";

export const analyses = pgTable("analyses", {
  id: uuid("id").defaultRandom().primaryKey(),

  issueId: uuid("issue_id")
    .references(() => issues.id)
    .notNull(),

  summary: text("summary"),

  rootCause: text("root_cause"),

  recommendations: text("recommendations"),

  createdAt: timestamp("created_at").defaultNow(),
});