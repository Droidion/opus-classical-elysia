import type { Composer } from "../db/queries/composersByPeriods";
import { formatYearsRangeString } from "../lib/helpers";

export function ComposerCard(
  props: Html.PropsWithChildren<{ composer: Composer }>,
): JSX.Element {
  return (
    <div class="mb-3 mr-6">
      <div>
        <span>{props.composer.lastName},&nbsp;</span>
        <span class="font-light">{props.composer.firstName}</span>
      </div>
      <div class="text-xs font-light">
        <span>{props.composer.countries}</span>
        <span class="vertical-separator" />
        <span>
          {formatYearsRangeString(
            props.composer.yearBorn,
            props.composer.yearDied,
          )}
        </span>
      </div>
    </div>
  );
}
