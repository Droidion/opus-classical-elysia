import type { Performer } from "../db/queries/recordingsByWork";

export function PerformerCard(
  props: Html.PropsWithChildren<{ performer: Performer }>,
): JSX.Element {
  return (
    <div class="mb-1.5 leading-5">
      <span>
        {props.performer.firstName}
        {props.performer.firstName && <span>&nbsp;</span>}
        {props.performer.lastName}&nbsp;
      </span>
      <span class="text-xs font-light">{props.performer.instrument}</span>
    </div>
  );
}
