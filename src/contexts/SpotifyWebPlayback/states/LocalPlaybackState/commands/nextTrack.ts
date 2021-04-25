export async function nextTrack(params: {
  localPlayback: Spotify.SpotifyPlayer;
}) {
  const { localPlayback } = params;
  await localPlayback.nextTrack();
}
