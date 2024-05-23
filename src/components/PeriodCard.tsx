import type { ComposersByPeriod } from "@db/queries/composersByPeriods";
import { formatYearsRangeString } from "@lib/helpers";
import { ComposerCard } from "@components/ComposerCard";

type Props = { period: ComposersByPeriod };

export async function PeriodCard({ period }: Props): Promise<string> {
  return (
    <>
      <h2>
        <span>{period.name},</span>
        <span> </span>
        <span>{formatYearsRangeString(period.yearStart, period.yearEnd)}</span>
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
  );
}
