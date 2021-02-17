import { useErrorHandler, withErrorBoundary } from 'react-error-boundary';
import {
  PlayerState,
  useSpotifyWebPlayback,
} from 'src/contexts/SpotifyWebPlayback';
import styled from 'styled-components';

import { ErrorFallback } from '../ErrorFallback';
import { Loading } from '../Loading';
import { TrackInfo } from './components/TrackInfo';

const Container = styled.aside`
  display: flex;
  padding: 0 16px;
  height: 90px;
  align-items: center;
`;

function MusicPlayerComponent() {
  const {
    error,
    playerConnectState,
    currentPlayingTrack,
  } = useSpotifyWebPlayback();
  useErrorHandler(error);

  if (playerConnectState === PlayerState.DISCONNECTED) return <Loading />;

  return (
    <Container aria-label="music-player">
      <TrackInfo currentPlayingTrack={currentPlayingTrack?.item} />
    </Container>
  );
}

export const MusicPlayer = withErrorBoundary(MusicPlayerComponent, {
  FallbackComponent: ErrorFallback,
});
