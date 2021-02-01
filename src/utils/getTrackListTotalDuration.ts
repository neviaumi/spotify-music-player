interface Track {
  duration_ms?: number;
  track?: { duration_ms: number };
}

export function getTrackListTotalDuration(tracks: Track[]) {
  return tracks.reduce(
    (acc, item) => acc + (item.track?.duration_ms ?? item.duration_ms!),
    0,
  );
}
