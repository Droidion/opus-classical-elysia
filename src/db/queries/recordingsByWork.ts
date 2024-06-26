import { and, eq, sql } from "drizzle-orm";
import { sort } from "fast-sort";
import { t, type Static } from "elysia";
import type { DrizzleDb } from "@db/connect";
import { filterUniqueBy } from "@lib/filterByUniqueId";
import {
  instruments,
  performers,
  performersRecordingsInstruments,
  recordings,
  links,
  streamers,
} from "../schema";
import { labels } from "../schema/labels";

export const Performer = t.Object({
  firstName: t.Nullable(t.String()),
  lastName: t.String(),
  instrument: t.String(),
  sort: t.Nullable(t.Number()),
});

export type Performer = Static<typeof Performer>;

export const Streamer = t.Object({
  link: t.String(),
  streamer: t.String(),
  prefix: t.String(),
  icon: t.String(),
});

export type Streamer = Static<typeof Streamer>;

export const Recording = t.Object({
  id: t.Number(),
  coverName: t.String(),
  length: t.Number(),
  label: t.Nullable(t.String()),
  workId: t.Number(),
  yearStart: t.Nullable(t.Number()),
  yearFinish: t.Number(),
  performers: t.Array(Performer),
  streamers: t.Array(Streamer),
});

export type Recording = Static<typeof Recording>;

export const RecordingsByWork = t.Array(Recording);

export type RecordingsByWork = Static<typeof RecordingsByWork>;

export async function getRecordingsByWork(
  db: DrizzleDb,
  workId: number,
): Promise<RecordingsByWork> {
  const results = await db
    .select({
      id: recordings.id,
      coverName: recordings.coverName,
      length: recordings.length,
      label: labels.name,
      workId: recordings.workId,
      yearStart: recordings.yearStart,
      yearFinish: recordings.yearFinish,
      performers: sql<
        Performer[]
      >`json_agg(json_build_object('firstName', ${performers.firstName}, 'lastName', ${performers.lastName}, 'instrument', ${instruments.name}, 'sort', ${performersRecordingsInstruments.priority}))`,
      streamers: sql<
        Streamer[]
      >`json_agg(json_build_object('link', ${links.link}, 'streamer', ${streamers.name}, 'prefix', ${streamers.appPrefix}, 'icon', ${streamers.iconName}))`,
    })
    .from(recordings)
    .leftJoin(labels, eq(recordings.labelId, labels.id))
    .leftJoin(
      links,
      and(eq(recordings.id, links.recordingId), eq(links.isShow, true)),
    )
    .leftJoin(streamers, eq(streamers.id, links.streamerId))
    .leftJoin(
      performersRecordingsInstruments,
      eq(recordings.id, performersRecordingsInstruments.recordingId),
    )
    .leftJoin(
      performers,
      eq(performers.id, performersRecordingsInstruments.performerId),
    )
    .leftJoin(
      instruments,
      eq(instruments.id, performersRecordingsInstruments.instrumentId),
    )
    .groupBy(
      recordings.id,
      recordings.coverName,
      recordings.length,
      labels.name,
      recordings.workId,
      recordings.yearStart,
      recordings.yearFinish,
    )
    .orderBy(recordings.yearFinish)
    .where(eq(recordings.workId, workId));
  return results.map((el) => ({
    ...el,
    streamers: sort(filterUniqueBy(el.streamers, "link")).asc(
      (s) => s.streamer,
    ),
    performers: sort(
      filterUniqueBy(el.performers, "lastName", "firstName"),
    ).asc((s) => s.sort),
  }));
}
