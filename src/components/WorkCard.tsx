import type { Work } from "@db/queries/worksByGenres";
import {
  formatWorkLength,
  formatYearsRangeString,
  formatCatalogueName,
  formatWorkName,
} from "../lib/helpers";

type Props = { work: Work };

export function WorkCard({ work }: Html.PropsWithChildren<Props>): JSX.Element {
  const fullName = formatWorkName(work.title, work.no, work.nickname);
  const catalogueNotation = formatCatalogueName(
    work.catalogueName,
    work.catalogueNumber,
    work.cataloguePostfix,
  );

  const averageLengthFormatted = formatWorkLength(work.averageMintues);
  const composePeriod = formatYearsRangeString(work.yearStart, work.yearFinish);
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
