import { relations } from "drizzle-orm";
import { integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { composers } from "./composers";

export const periods = pgTable(
  "periods",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    yearStart: integer("year_start"),
    yearEnd: integer("year_end"),
    slug: text("slug").notNull(),
  },
  (table) => ({
    idIdx: uniqueIndex("periods_id_idx").on(table.id),
  }),
);

export const periodsRelations = relations(periods, ({ many }) => ({
  composers: many(composers),
}));

export type Period = typeof periods.$inferSelect;
