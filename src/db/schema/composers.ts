import { relations } from "drizzle-orm";
import {
  index,
  integer,
  boolean,
  pgTable,
  pgView,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { composersCountries } from "./composersCountries";
import { periods } from "./periods";

const composersBase = {
  id: integer("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  yearBorn: integer("year_born").notNull(),
  yearDied: integer("year_died"),
  periodId: integer("period_id")
    .notNull()
    .references(() => periods.id),
  slug: text("slug").notNull(),
  wikipediaLink: text("wikipedia_link"),
  imslpLink: text("imslp_link"),
  enabled: boolean("enabled").notNull(),
};

export const composers = pgTable("composers", composersBase, (table) => ({
  idIdx: uniqueIndex("composers_id_idx").on(table.id),
  periodIdIdx: index("composers_period_id_idx").on(table.periodId),
  slugIdx: index("composers_slug_idx").on(table.slug),
}));

export const composersView = pgView("composers_with_countries", {
  ...composersBase,
  countries: text("countries").notNull(),
}).existing();

export const composersRelations = relations(composers, ({ one, many }) => ({
  period: one(periods, {
    fields: [composers.periodId],
    references: [periods.id],
  }),
  composersToCountries: many(composersCountries),
}));

export type Composer = typeof composers.$inferSelect;
