import { t, type Static } from "elysia";
import type { DrizzleDb } from "@db/connect";
import { composersView, periods } from "@db/schema";

export const Composer = t.Object({
  firstName: t.String(),
  lastName: t.String(),
  yearBorn: t.Number(),
  yearDied: t.Nullable(t.Number()),
  periodId: t.Number(),
  slug: t.String(),
  countries: t.String(),
});

export type Composer = Static<typeof Composer>;

const ComposersByPeriod = t.Object({
  id: t.Number(),
  name: t.String(),
  yearStart: t.Nullable(t.Number()),
  yearEnd: t.Nullable(t.Number()),
  composers: t.Array(Composer),
});

export type ComposersByPeriod = Static<typeof ComposersByPeriod>;

export const ComposersByPeriods = t.Array(ComposersByPeriod);

export type ComposersByPeriods = Static<typeof ComposersByPeriods>;

export async function getComposersByPeriods(
  db: DrizzleDb,
): Promise<ComposersByPeriods> {
  const periodsData = await db
    .select()
    .from(periods)
    .orderBy(periods.yearStart);

  const composersData = await db
    .select()
    .from(composersView)
    .orderBy(composersView.lastName);

  return periodsData.map((periodItem) => ({
    ...periodItem,
    composers: composersData.filter((com) => com.periodId === periodItem.id),
  }));
}
