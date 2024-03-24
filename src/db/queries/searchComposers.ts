import { t, type Static } from "elysia";
import type { DrizzleDb } from "@db/connect";
import { composers } from "@db/schema/composers";

export const FoundComposers = t.Array(
  t.Object({
    firstName: t.String(),
    lastName: t.String(),
    slug: t.String(),
  }),
);

export type FoundComposers = Static<typeof FoundComposers>;

export async function searchComposers(db: DrizzleDb): Promise<FoundComposers> {
  return await db
    .select({
      firstName: composers.firstName,
      lastName: composers.lastName,
      slug: composers.slug,
    })
    .from(composers);
}
