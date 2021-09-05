import type { SeekPlaybackPayload } from '../../../typings/Command';

export async function seekPlayback(params: {
  localPlayback: Spotify.Player;
  payload: SeekPlaybackPayload;
}) {
  const {
    localPlayback,
    payload: { position_ms },
  } = params;
  await localPlayback.seek(position_ms);
}
