import { relations } from "drizzle-orm";
import { integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { links } from "./links";

export const streamers = pgTable(
  "streamers",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    iconName: text("icon_name").notNull(),
    appPrefix: text("app_prefix").notNull(),
  },
  (table) => ({
    idIdx: uniqueIndex("streamers_id_idx").on(table.id),
  }),
);

export const streamersRelations = relations(streamers, ({ many }) => ({
  links: many(links),
}));

export type Streamer = typeof streamers.$inferSelect;
