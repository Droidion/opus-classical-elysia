import { Composer } from "../db/queries/composersByPeriods";
import { formatYearsRangeString } from "../lib/formatYearsRangeString";

export function ComposerCard(
  props: Html.PropsWithChildren<{ composer: Composer }>,
): JSX.Element {
  return (
    <div class="mb-3 mr-6">
      <div>
        <span>{props.composer.lastName},&nbsp;</span>
        <span class="font-light" safe>
          {props.composer.firstName}
        </span>
      </div>
      <div class="text-xs font-light">
        <span safe>{props.composer.countries}</span>
        <span class="vertical-separator"></span>
        <span safe>
          {formatYearsRangeString(
            props.composer.yearBorn,
            props.composer.yearDied,
          )}
        </span>
      </div>
    </div>
  );
}
