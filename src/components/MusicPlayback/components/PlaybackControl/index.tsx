import styled from 'styled-components';

import { useSpotifyWebPlayback } from '../../../../contexts/SpotifyWebPlayback';
import { ControlButtons } from './ControlButtons';
import { TimeBar } from './TimeBar';

const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 40%;
  max-width: 722px;
  flex-direction: column;
  align-items: center;
`;

export function PlaybackControl() {
  const {
    data: {
      progressMS,
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
      seekTrack,
      playbackType,
    },
    isLoading,
  } = useSpotifyWebPlayback();
  return (
    <Container>
      <ControlButtons
        disallows={playbackDisallowedActions}
        isActive={isActive}
        isLoading={isLoading}
        isPaused={isPaused}
        onClickChangeRepeatMode={changeRepeatMode}
        onClickNextTrack={playNextTrack}
        onClickPreviousTrack={playPreviousTrack}
        onClickTogglePlay={togglePlayMode}
        onClickToggleShuffleMode={toggleShuffleMode}
        repeatMode={playbackRepeatMode}
        shuffleMode={playbackEnabledShuffle}
      />
      <TimeBar
        currentProgressMS={progressMS!}
        currentTrackId={currentPlayingTrack?.id}
        disallowSeeking={playbackDisallowedActions?.seeking ?? false}
        isLoading={isLoading}
        isPaused={isPaused}
        onChangeTrackPlayingPosition={seekTrack}
        playbackType={playbackType}
        trackDuration={currentPlayingTrack?.duration_ms}
      />
    </Container>
  );
}
