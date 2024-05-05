import { relations } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  sqliteView,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { composersCountries } from "./composersCountries";
import { periods } from "./periods";

export const composers = sqliteTable(
  "composers",
  {
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
    enabled: integer("enabled", { mode: "boolean" }).notNull(),
  },
  (table) => ({
    idIdx: uniqueIndex("composers_id_idx").on(table.id),
    periodIdIdx: index("composers_period_id_idx").on(table.periodId),
    slugIdx: index("composers_slug_idx").on(table.slug),
  }),
);

export const composersView = sqliteView("composers_with_countries", {
  id: integer("id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  yearBorn: integer("year_born").notNull(),
  yearDied: integer("year_died"),
  periodId: integer("period_id").notNull().references(() => periods.id),
  slug: text("slug").notNull(),
  wikipediaLink: text("wikipedia_link"),
  imslpLink: text("imslp_link"),
  enabled: integer("enabled", { mode: "boolean" }).notNull(),
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
