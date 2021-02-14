import { useErrorHandler, withErrorBoundary } from 'react-error-boundary';
import {
  PlayerState,
  useSpotifyWebPlayback,
} from 'src/contexts/SpotifyWebPlayback';

import { ErrorFallback } from '../ErrorFallback';
import { Loading } from '../Loading';

function MusicPlayerComponent() {
  const {
    error,
    playerConnectState,
    currentPlayingTrack,
  } = useSpotifyWebPlayback();
  useErrorHandler(error);

  if (playerConnectState === PlayerState.DISCONNECTED) return <Loading />;

  return <div>Playing {currentPlayingTrack?.item.name}</div>;
}

export const MusicPlayer = withErrorBoundary(MusicPlayerComponent, {
  FallbackComponent: ErrorFallback,
});
