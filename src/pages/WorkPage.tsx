import { AppLayout } from "../components/AppLayout";
import { RecordingCard } from "../components/RecordingCard";
import { dbConnect } from "../db/connect";
import { getRecordingsByWork } from "../db/queries/recordingsByWork";
import { getWorkMetadata } from "../db/queries/workMetadata";
import { formatWorkName, formatYearsRangeString } from "../lib/helpers";

export async function WorkPage({
  workId,
}: Html.PropsWithChildren<{ workId: number }>): Promise<string> {
  const work = await getWorkMetadata(dbConnect(), workId);
  const recordings = await getRecordingsByWork(dbConnect(), workId);

  const fullName = work
    ? formatWorkName(work.title, work.no, work.nickname)
    : "";
  const title = work
    ? formatWorkName(work.title, work.no, work.nickname, true)
    : "";
  const composePeriod = work
    ? formatYearsRangeString(work?.yearStart, work?.yearFinish)
    : "";

  return (
    <AppLayout title={`${title} | Opus Classical`}>
      <div>
        <h1>
          <span>{fullName}</span>
        </h1>
        <div class="mb-4 w-full text-center">
          <a href={`/composer/${work?.composerSlug}`}>
            {work?.composerFirstName}&nbsp;{work?.composerLastName}
          </a>
          {composePeriod && <span>, {composePeriod}</span>}
        </div>
        <h2>Recommended Recordings</h2>
        <hr />
        <div class="full-width mb-4 flex flex-wrap">
          {recordings?.map((recording) => (
            <RecordingCard recording={recording} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
