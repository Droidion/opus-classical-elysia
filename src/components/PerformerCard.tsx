import type { Performer } from "@db/queries/recordingsByWork";

type Props = { performer: Performer };

export function PerformerCard({ performer }: Props): JSX.Element {
  return (
    <div class="mb-1.5 leading-5">
      <span>
        {performer.firstName}
        {performer.firstName && <span>&nbsp;</span>}
        {performer.lastName}&nbsp;
      </span>
      <span class="text-xs font-light">{performer.instrument}</span>
    </div>
  );
}
