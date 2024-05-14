import { relations } from "drizzle-orm";
import { integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { recordings } from "./recordings";

export const labels = pgTable(
  "labels",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
  },
  (table) => ({
    idIdx: uniqueIndex("labels_id_idx").on(table.id),
  }),
);

export const labelsRelations = relations(labels, ({ many }) => ({
  recordings: many(recordings),
}));

export type Label = typeof labels.$inferSelect;
