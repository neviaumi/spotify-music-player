export async function previousTrack(params: {
  localPlayback: Spotify.SpotifyPlayer;
}) {
  const { localPlayback } = params;
  await localPlayback.previousTrack();
}
