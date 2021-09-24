export async function resumePlayback(params: {
  localPlayback: Spotify.Player;
}) {
  const { localPlayback } = params;
  await localPlayback.resume();
}
