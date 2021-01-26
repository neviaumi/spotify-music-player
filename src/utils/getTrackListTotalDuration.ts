interface Track {
  track: { duration_ms: number };
}

export function getTrackListTotalDuration(tracks: Track[]) {
  return tracks.reduce((acc, item) => acc + item.track.duration_ms, 0);
}
