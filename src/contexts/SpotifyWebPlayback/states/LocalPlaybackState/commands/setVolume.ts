import type { SetVolumePayload } from '../../../typings/Command';

export async function setVolume(params: {
  localPlayback: Spotify.SpotifyPlayer;
  payload: SetVolumePayload;
}) {
  const {
    localPlayback,
    payload: { volume },
  } = params;
  await localPlayback.setVolume(volume / 100.0);
}
