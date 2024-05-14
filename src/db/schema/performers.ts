import { relations } from "drizzle-orm";
import { integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { performersRecordingsInstruments } from "./performersRecordingsInstruments";

export const performers = pgTable(
  "performers",
  {
    id: integer("id").primaryKey(),
    firstName: text("first_name"),
    lastName: text("last_name").notNull(),
  },
  (table) => ({
    idIdx: uniqueIndex("performers_id_idx").on(table.id),
  }),
);

export const performersRelations = relations(performers, ({ many }) => ({
  performersToRecordingsToInstruments: many(performersRecordingsInstruments),
}));

export type Performer = typeof performers.$inferSelect;
