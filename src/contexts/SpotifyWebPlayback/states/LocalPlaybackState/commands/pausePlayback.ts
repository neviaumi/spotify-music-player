export async function pausePlayback(params: {
  localPlayback: Spotify.SpotifyPlayer;
}) {
  const { localPlayback } = params;
  await localPlayback.pause();
}
