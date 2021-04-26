export async function resumePlayback(params: {
  localPlayback: Spotify.SpotifyPlayer;
}) {
  const { localPlayback } = params;
  await localPlayback.resume();
}
