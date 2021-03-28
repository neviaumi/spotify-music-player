import type { MouseEvent } from 'react';
import { useCallback } from 'react';
import { RepeatMode } from 'src/contexts/SpotifyWebPlayback/states/RepeatMode';
import styled from 'styled-components';

import { ReactComponent as Next } from './next.svg';
import { ReactComponent as Pause } from './pause.svg';
import { ReactComponent as Play } from './play.svg';
import { ReactComponent as Previous } from './previous.svg';
import { ReactComponent as Repeat } from './repeat.svg';
import { ReactComponent as RepeatOne } from './repeat-one.svg';
import { ReactComponent as Shuffle } from './shuffle.svg';

const Container = styled.section`
  display: flex;
  margin-bottom: ${props => props.theme.spaces.s};
  width: 224px;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  gap: ${props => props.theme.spaces.xxxs};
  outline: none;
  ${props => {
    if (props.disabled)
      return `
color: ${props.theme.colors.contrast2};
fill: ${props.theme.colors.contrast2};`;
    return `
color: ${props.theme.colors.contrast4};
fill: ${props.theme.colors.contrast4};
&:hover {
  color: ${props.theme.colors.foreground};
  fill: ${props.theme.colors.foreground};
}`;
  }}
`;
const NextButton = styled(Button)``;
const ToggleButton = styled(Button)`
  border-radius: 32px;

  ${props => {
    const { disabled } = props;
    if (disabled) {
      return `
background-color: ${props.theme.colors.contrast4};
color: ${props.theme.colors.background};
fill: ${props.theme.colors.background};
`;
    }
    return `
background-color: ${props.theme.colors.foreground};
color: ${props.theme.colors.background};
fill: ${props.theme.colors.background};
&:hover {
  color: ${props.theme.colors.background};
  fill: ${props.theme.colors.background};
  transform: scale(1.06);
}
`;
  }}
`;
const PreviousButton = styled(Button)``;
const RepeatButton = styled(Button)<{ active: boolean }>`
  ${props => {
    const { active } = props;
    if (active) {
      return `
color: ${props.theme.colors.green};
fill: ${props.theme.colors.green};
&:hover {
  color: ${props.theme.colors.lightGreen};
  fill: ${props.theme.colors.lightGreen};
}
&:after {
  display: block;
  width: 4px;
  height: 4px;
  content: "";
  border-radius: 50%;
  background-color: currentColor;
}
`;
    }
    return '';
  }}
`;
const ShuffleButton = styled(Button)<{ active: boolean }>`
  ${props => {
    const { active } = props;
    if (active) {
      return `
color: ${props.theme.colors.green};
fill: ${props.theme.colors.green};
&:hover {
  color: ${props.theme.colors.lightGreen};
  fill: ${props.theme.colors.lightGreen};
}
&:after {
  display: block;
  width: 4px;
  height: 4px;
  content: "";
  border-radius: 50%;
  background-color: currentColor;
}
`;
    }
    return '';
  }}
`;

export interface Props {
  disallows?: Spotify.PlaybackDisallows;
  isActive: boolean;
  isLoading?: boolean;
  isPaused?: boolean;
  onClickChangeRepeatMode: (newMode: RepeatMode) => void;
  onClickNextTrack: () => void;
  onClickPreviousTrack: () => void;
  onClickTogglePlay: () => void;
  onClickToggleShuffleMode: () => void;
  repeatMode?: RepeatMode;
  shuffleMode?: boolean;
}

export function ControlButtons({
  disallows,
  isActive,
  isPaused,
  onClickChangeRepeatMode,
  onClickNextTrack,
  onClickPreviousTrack,
  onClickTogglePlay,
  onClickToggleShuffleMode,
  repeatMode,
  shuffleMode,
  isLoading,
}: Props) {
  const onEnabledButtonClick = useCallback(
    (handler: () => void) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const isButtonDisabled =
        event.currentTarget.getAttribute('disabled') ?? 'false';
      if (isButtonDisabled === 'false') handler();
    },
    [],
  );
  const nextRepeatMode = repeatMode
    ? {
        [RepeatMode.Off]: RepeatMode.Context,
        [RepeatMode.Track]: RepeatMode.Off,
        [RepeatMode.Context]: RepeatMode.Track,
      }[repeatMode]
    : undefined;
  return (
    <Container>
      <ShuffleButton
        active={shuffleMode ?? false}
        disabled={isLoading}
        onClick={onEnabledButtonClick(onClickToggleShuffleMode)}
        title={`${shuffleMode ? 'Disable' : 'Enable'} shuffle mode`}
      >
        <Shuffle />
      </ShuffleButton>
      <PreviousButton
        disabled={isLoading || !isActive || disallows?.skipping_prev}
        onClick={onEnabledButtonClick(onClickPreviousTrack)}
        title="Previous track"
      >
        <Previous />
      </PreviousButton>
      <ToggleButton
        disabled={
          isLoading ||
          (isPaused && disallows?.resuming) ||
          (!isPaused && disallows?.pausing)
        }
        onClick={onEnabledButtonClick(onClickTogglePlay)}
        title={`${isPaused ? 'Continue' : 'Pause'} playback`}
      >
        {isPaused || !isActive ? <Play /> : <Pause />}
      </ToggleButton>
      <NextButton
        disabled={isLoading || !isActive || disallows?.skipping_next}
        onClick={onEnabledButtonClick(onClickNextTrack)}
        title="Next track"
      >
        <Next />
      </NextButton>
      <RepeatButton
        active={repeatMode !== RepeatMode.Off}
        disabled={isLoading}
        onClick={onEnabledButtonClick(() => {
          if (!nextRepeatMode) return;

          onClickChangeRepeatMode(nextRepeatMode);
        })}
        title={
          nextRepeatMode
            ? {
                [RepeatMode.Track]: 'Enable repeat one',
                [RepeatMode.Context]: 'Enable repeat',
                [RepeatMode.Off]: 'Disable repeat',
              }[nextRepeatMode]
            : ''
        }
      >
        {repeatMode === RepeatMode.Track ? <RepeatOne /> : <Repeat />}
      </RepeatButton>
    </Container>
  );
}
