export async function nextTrack(params: { localPlayback: Spotify.Player }) {
  const { localPlayback } = params;
  await localPlayback.nextTrack();
}
