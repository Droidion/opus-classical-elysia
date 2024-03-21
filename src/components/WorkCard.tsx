import type { Work } from "../db/queries/worksByGenres";
import {
  formatWorkLength,
  formatYearsRangeString,
  formatCatalogueName,
  formatWorkName,
} from "../lib/helpers";

export function WorkCard(
  props: Html.PropsWithChildren<{ work: Work }>,
): JSX.Element {
  const fullName = formatWorkName(
    props.work.title,
    props.work.no,
    props.work.nickname,
  );

  const catalogueNotation = formatCatalogueName(
    props.work.catalogueName,
    props.work.catalogueNumber,
    props.work.cataloguePostfix,
  );

  const averageLengthFormatted = formatWorkLength(props.work.averageMintues);

  const composePeriod = formatYearsRangeString(
    props.work.yearStart,
    props.work.yearFinish,
  );

  const showWorkSubtitle =
    !!fullName || !!catalogueNotation || !!averageLengthFormatted;

  return (
    <div class="mb-3 mr-6">
      <div>
        <span>{fullName}</span>
      </div>
      {showWorkSubtitle && (
        <div class="text-xs font-light">
          {catalogueNotation && <span safe>{catalogueNotation}</span>}
          {catalogueNotation && (composePeriod || averageLengthFormatted) && (
            <span class="vertical-separator" />
          )}
          {composePeriod && <span safe>{composePeriod}</span>}
          {composePeriod && <span class="vertical-separator" />}
          {averageLengthFormatted && <span safe>{averageLengthFormatted}</span>}
        </div>
      )}
    </div>
  );
}
