import { eq } from "drizzle-orm";
import { t, type Static } from "elysia";
import type { DrizzleDb } from "@db/connect";
import { catalogues } from "@db/schema/catalogues";
import { composers } from "@db/schema/composers";
import { works } from "@db/schema/works";

export const WorkMetadata = t.Object({
  title: t.String(),
  composerFirstName: t.String(),
  composerLastName: t.String(),
  composerSlug: t.String(),
  catalogueName: t.Nullable(t.String()),
  catalogueNumber: t.Nullable(t.Number()),
  cataloguePostfix: t.Nullable(t.String()),
  yearStart: t.Nullable(t.Number()),
  yearFinish: t.Nullable(t.Number()),
  no: t.Nullable(t.Number()),
  nickname: t.Nullable(t.String()),
});

export type WorkMetadata = Static<typeof WorkMetadata>;

export async function getWorkMetadata(
  db: DrizzleDb,
  workId: number,
): Promise<WorkMetadata> {
  const allWorks = await db
    .select({
      title: works.title,
      composerFirstName: composers.firstName,
      composerLastName: composers.lastName,
      composerSlug: composers.slug,
      catalogueName: catalogues.name,
      catalogueNumber: works.catalogueNumber,
      cataloguePostfix: works.cataloguePostfix,
      yearStart: works.yearStart,
      yearFinish: works.yearFinish,
      no: works.no,
      nickname: works.nickname,
    })
    .from(works)
    .innerJoin(composers, eq(composers.id, works.composerId))
    .leftJoin(catalogues, eq(catalogues.id, works.catalogueId))
    .where(eq(works.id, workId));

  if (allWorks[0]) {
    return allWorks[0];
  }

  throw new Error(`Work with id ${workId} not found`);
}
