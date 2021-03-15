import { useErrorHandler, withErrorBoundary } from 'react-error-boundary';
import {
  PlaybackState,
  useSpotifyWebPlayback,
} from 'src/contexts/SpotifyWebPlayback';
import styled from 'styled-components';

import { ErrorFallback } from '../ErrorFallback';
import { Loading } from '../Loading';
import { PlaybackControl } from './components/PlaybackControl';
import { TrackInfo } from './components/TrackInfo';

const Container = styled.aside`
  display: flex;
  padding: 0 16px;
  height: 90px;
  align-items: center;
  background-color: ${props => props.theme.colors.grey24};
  border-top: 1px solid ${props => props.theme.colors.grey40};
`;

function MusicPlaybackComponent() {
  const {
    error,
    isLoading,
    data: {
      playbackState,
      currentPlayingTrack,
      playbackDisallowedActions,
      playbackRepeatMode,
      playbackEnabledShuffle,
      isPaused,
      changeRepeatMode,
      playNextTrack,
      playPreviousTrack,
      togglePlayMode,
      toggleShuffleMode,
      isActive,
    },
  } = useSpotifyWebPlayback();
  useErrorHandler(error);

  if (playbackState === PlaybackState.INIT) return <Loading />;

  return (
    <Container aria-label="music-playback">
      <TrackInfo currentPlayingTrack={currentPlayingTrack} />
      <PlaybackControl
        controlButtons={{
          disallows: playbackDisallowedActions,
          isActive,
          isLoading,
          isPaused,
          onClickChangeRepeatMode: changeRepeatMode,
          onClickNextTrack: playNextTrack,
          onClickPreviousTrack: playPreviousTrack,
          onClickTogglePlay: togglePlayMode,
          onClickToggleShuffleMode: toggleShuffleMode,
          repeatMode: playbackRepeatMode,
          shuffleMode: playbackEnabledShuffle,
        }}
      />
    </Container>
  );
}

export const MusicPlayback = withErrorBoundary(MusicPlaybackComponent, {
  FallbackComponent: ErrorFallback,
});
