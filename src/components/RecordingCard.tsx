import { Recording } from "../db/queries/recordingsByWork";
import { formatWorkLength, formatYearsRangeString } from "../lib/helpers";
import { PerformerCard } from "./PerformerCard";
import { StreamerCard } from "./StreamerCard";

export function RecordingCard({
  recording,
}: Html.PropsWithChildren<{ recording: Recording }>): JSX.Element {
  const lengthFormatted = formatWorkLength(recording.length);
  const composePeriod = formatYearsRangeString(
    recording.yearStart,
    recording.yearFinish,
  );
  return (
    <div class="mb-6 mr-8 mt-2 flex min-w-full flex-1 xl:min-w-[450px]">
      <img
        class="cover float-left mr-4 h-24 w-24 border border-black/20 xl:mr-6 xl:h-52 xl:w-52 dark:border-white/20"
        src={`${Bun.env.IMAGES_URL}/${recording.coverName}`}
        alt="A description of my image."
        width="400"
        height="400"
      />
      <div>
        {recording.performers.map((performer) => (
          <PerformerCard performer={performer} />
        ))}
        <div class="text-xs font-light">
          <span>{recording.label}</span>
          <span class="vertical-separator"></span>
          <span>{composePeriod}</span>
          <span class="vertical-separator"></span>
          <span>{lengthFormatted}</span>
        </div>
        <div class="flex items-center">
          {recording.streamers.map((streamer) => (
            <StreamerCard streamer={streamer} />
          ))}
        </div>
      </div>
    </div>
  );
}
