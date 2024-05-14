import { relations } from "drizzle-orm";
import {
  index,
  integer,
  boolean,
  primaryKey,
  pgTable,
  text,
} from "drizzle-orm/pg-core";
import { recordings } from "./recordings";
import { streamers } from "./streamers";

export const links = pgTable(
  "links",
  {
    recordingId: integer("recording_id")
      .notNull()
      .references(() => recordings.id),
    streamerId: integer("streamer_id")
      .notNull()
      .references(() => streamers.id),
    link: text("link").notNull(),
    isShow: boolean("is_show").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.recordingId, t.streamerId] }),
    recordingIdIdx: index("rs_recording_id_idx").on(t.recordingId),
    streamerIdIdx: index("rs_streamer_id_idx").on(t.streamerId),
  }),
);

export const linksRelations = relations(links, ({ one }) => ({
  recording: one(recordings, {
    fields: [links.recordingId],
    references: [recordings.id],
  }),
  streamer: one(streamers, {
    fields: [links.streamerId],
    references: [streamers.id],
  }),
}));

export type links = typeof links.$inferSelect;
