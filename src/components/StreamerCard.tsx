import type { Streamer } from "@db/queries/recordingsByWork";

type Props = { streamer: Streamer };

export function StreamerCard({ streamer }: Props): JSX.Element {
  return (
    <div class="mr-2 mt-2">
      <a href={streamer.prefix + streamer.link}>
        {streamer.streamer === "Spotify" && (
          <img
            src="/public/spotify-logo.svg"
            height="24"
            width="24"
            alt="Spotify"
          />
        )}

        {streamer.streamer === "Qobuz" && (
          <img
            src="/public/qobuz-logo.svg"
            height="24"
            width="24"
            alt="Qobuz"
          />
        )}
      </a>
    </div>
  );
}
