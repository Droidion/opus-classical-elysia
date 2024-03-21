import { AppLayout } from "../components/AppLayout";
import { ComposerCard } from "../components/ComposerCard";
import { dbConnect } from "../db/connect";
import { getComposersByPeriods } from "../db/queries/composersByPeriods";
import { formatYearsRangeString } from "../lib/formatYearsRangeString";

export async function IndexPage(): Promise<string> {
  const periods = await getComposersByPeriods(dbConnect());
  return (
    <AppLayout title="Composers | Opus Classical">
      <div>
        <h1>Composers</h1>
        {periods.map((period) => (
          <>
            <h2>
              <span safe>{period.name},</span>
              <span> </span>
              <span safe>
                {formatYearsRangeString(period.yearStart, period.yearEnd)}
              </span>
            </h2>
            <hr />
            <div class="mb-4 flex flex-wrap">
              {period.composers.map((composer) => (
                <a href={`/composer/${composer.slug}`}>
                  <ComposerCard composer={composer} />
                </a>
              ))}
            </div>
          </>
        ))}
      </div>
    </AppLayout>
  );
}
