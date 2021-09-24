export async function previousTrack(params: { localPlayback: Spotify.Player }) {
  const { localPlayback } = params;
  await localPlayback.previousTrack();
}
