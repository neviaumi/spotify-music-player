import { useErrorHandler, withErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

import { useSpotifyWebPlayback } from '../../contexts/SpotifyWebPlayback';
import { ErrorFallback } from '../ErrorFallback';
import { Loading } from '../Loading';
import { ExtraControl } from './components/ExtraControl';
import { PlaybackControl } from './components/PlaybackControl';
import { TrackInfo } from './components/TrackInfo';

const Container = styled.aside`
  align-items: center;
  background-color: ${props => props.theme.colors.contrast1};
  border-top: 1px solid ${props => props.theme.colors.contrast2};
  display: flex;
  height: 90px;
  padding: 0 ${props => props.theme.spaces.m};
`;

function MusicPlaybackComponent() {
  const {
    error,
    data: { currentPlaybackState },
  } = useSpotifyWebPlayback();
  useErrorHandler(error);

  if (!currentPlaybackState) return <Loading />;

  return (
    <Container aria-label="music-playback">
      <TrackInfo />
      <PlaybackControl />
      <ExtraControl />
    </Container>
  );
}

export const MusicPlayback = withErrorBoundary(MusicPlaybackComponent, {
  FallbackComponent: ErrorFallback,
});
