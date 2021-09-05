export async function pausePlayback(params: { localPlayback: Spotify.Player }) {
  const { localPlayback } = params;
  await localPlayback.pause();
}
