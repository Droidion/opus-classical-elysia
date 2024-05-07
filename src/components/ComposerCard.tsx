import type { Composer } from "@db/queries/composersByPeriods";
import { formatYearsRangeString } from "@lib/helpers";

type Props = { composer: Composer };

export function ComposerCard({ composer }: Props): JSX.Element {
  return (
    <div class="mb-3 mr-6">
      <div>
        <span>{composer.lastName},&nbsp;</span>
        <span class="font-light">{composer.firstName}</span>
      </div>
      <div class="text-xs font-light">
        <span>{composer.countries}</span>
        <span class="vertical-separator" />
        <span>
          {formatYearsRangeString(composer.yearBorn, composer.yearDied)}
        </span>
      </div>
    </div>
  );
}
