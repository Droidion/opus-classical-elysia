import { eq } from "drizzle-orm";
import { t, type Static } from "elysia";
import type { DrizzleDb } from "@db/connect";
import { composersCountries, countries } from "@db/schema";

export const CountriesByComposer = t.Array(
  t.Object({
    name: t.String(),
  }),
);

export type CountriesByComposer = Static<typeof CountriesByComposer>;

export async function getCountriesByComposer(
  db: DrizzleDb,
  composerId: number,
): Promise<CountriesByComposer> {
  return await db
    .select({
      name: countries.name,
    })
    .from(countries)
    .innerJoin(
      composersCountries,
      eq(composersCountries.countryId, countries.id),
    )
    .where(eq(composersCountries.composerId, composerId));
}
