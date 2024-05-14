import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { labels } from "./labels";
import { performersRecordingsInstruments } from "./performersRecordingsInstruments";
import { links } from "./links";
import { works } from "./works";

export const recordings = pgTable(
  "recordings",
  {
    id: integer("id").primaryKey(),
    coverName: text("cover_name").notNull(),
    length: integer("length").notNull(),
    labelId: integer("label_id")
      .notNull()
      .references(() => labels.id),
    workId: integer("work_id")
      .notNull()
      .references(() => works.id),
    yearStart: integer("year_start"),
    yearFinish: integer("year_finish").notNull(),
  },
  (table) => ({
    idIdx: uniqueIndex("recordings_id_idx").on(table.id),
    labelIdIdx: index("label_id_idx").on(table.labelId),
    workIdIdx: index("work_id_idx").on(table.workId),
  }),
);

export const recordingsRelations = relations(recordings, ({ one, many }) => ({
  label: one(labels, {
    fields: [recordings.labelId],
    references: [labels.id],
  }),
  work: one(works, {
    fields: [recordings.workId],
    references: [works.id],
  }),
  performersRecordingsInstruments: many(performersRecordingsInstruments),
  links: many(links),
}));

export type Recording = typeof recordings.$inferSelect;
