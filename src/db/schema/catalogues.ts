import { relations } from "drizzle-orm";
import { integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { works } from "./works";

export const catalogues = pgTable(
  "catalogues",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
  },
  (table) => ({
    idIdx: uniqueIndex("catalogues_id_idx").on(table.id),
  }),
);

export const cataloguesRelations = relations(catalogues, ({ many }) => ({
  works: many(works),
}));

export type Catalogue = typeof catalogues.$inferSelect;
