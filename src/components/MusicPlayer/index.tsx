import { useSpotifyWebPlayback } from 'src/contexts/SpotifyWebPlayback';

import { Loading } from '../Loading';

export function MusicPlayer() {
  const { isPlaybackReady, currentPlayingTrack } = useSpotifyWebPlayback();
  if (!isPlaybackReady) return <Loading />;
  return <div>Playing {currentPlayingTrack?.name}</div>;
}
