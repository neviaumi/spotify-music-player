import styled from 'styled-components';

import { useSpotifyWebPlayback } from '../../../../contexts/SpotifyWebPlayback';
import { ControlButtons } from './ControlButtons';
import { TimeBar } from './TimeBar';

const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 722px;
  width: 40%;
`;

export function PlaybackControl() {
  const {
    actions: {
      changeRepeatMode,
      playNextTrack,
      playPreviousTrack,
      togglePlayMode,
      toggleShuffleMode,
      seekTrack,
    },
    data: {
      currentPlaybackState,

      playbackType,
    },
    isLoading,
  } = useSpotifyWebPlayback();
  const {
    progress_ms,
    is_paused,
    actions: { disallows },
    track,
    repeat_state,
    shuffle_state,
    device: { is_active },
  } = currentPlaybackState!;
  return (
    <Container>
      <ControlButtons
        disallows={disallows}
        isActive={is_active}
        isLoading={isLoading}
        isPaused={is_paused}
        onClickChangeRepeatMode={changeRepeatMode}
        onClickNextTrack={playNextTrack}
        onClickPreviousTrack={playPreviousTrack}
        onClickTogglePlay={togglePlayMode}
        onClickToggleShuffleMode={toggleShuffleMode}
        repeatMode={repeat_state}
        shuffleMode={shuffle_state}
      />
      <TimeBar
        currentProgressMS={progress_ms}
        currentTrackId={track?.id}
        disallowSeeking={disallows?.seeking ?? false}
        isLoading={isLoading}
        isPaused={is_paused}
        onChangeTrackPlayingPosition={seekTrack}
        playbackType={playbackType}
        trackDuration={track?.duration_ms}
      />
    </Container>
  );
}
