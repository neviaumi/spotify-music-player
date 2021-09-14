import { useEffect, useState } from 'react';
import { getTrackBackground, Range } from 'react-range';
import styled, { useTheme } from 'styled-components';

import type { PlaybackType } from '../../../../../contexts/SpotifyWebPlayback';
import type { theme } from '../../../../../contexts/Theme';
import VolumeHigh from './volume-high.svg';
import VolumeLow from './volume-low.svg';
import VolumeMedium from './volume-medium.svg';
import VolumeOff from './volume-off.svg';

const VolumeBarContainer = styled.section`
  align-items: center;
  display: flex;
  width: 125px;
`;

const VolumeStateButton = styled.button`
  background-color: transparent;
  border: 0;
  height: 32px;
  min-width: 32px;
  outline: 0;
  width: 32px;
  svg {
    fill: ${props => props.theme.colors.contrast4};
  }
  &:hover {
    svg {
      fill: ${props => props.theme.colors.foreground};
    }
  }
`;

const Thumb = styled.button`
  background-color: ${props => props.theme.colors.foreground};
  border: 0px;
  border-radius: 50%;
  height: 12px;
  outline: 0;
  width: 12px;
`;

const Track = styled.div`
  background-color: ${props => props.theme.colors.contrast3};
  border-radius: 2px;
  height: 4px;
  width: 100%;
`;

export interface Props {
  currentVolume?: number;
  isLoading: boolean;
  onChangeVolume: (newVolume: number) => void;
  playbackType: PlaybackType;
}

function VolumeBarButtonIcon({ currentVolume }: { currentVolume?: number }) {
  if (!currentVolume || currentVolume === 0)
    return <VolumeOff aria-label={'volume-off'} role={'button'} />;
  const interval = 100 / 3;
  switch (Math.ceil(currentVolume / interval)) {
    case 1:
      return <VolumeLow aria-label={'volume-low'} role={'button'} />;
    case 2:
      return <VolumeMedium aria-label={'volume-medium'} role={'button'} />;
    default:
      return <VolumeHigh aria-label={'volume-high'} role={'button'} />;
  }
}

export function VolumeBar({
  currentVolume,
  isLoading,
  onChangeVolume,
  playbackType,
}: Props) {
  const [currentVolumeValue, setValues] = useState([0]);
  const [showThumb, setShowThumb] = useState(false);
  const styledTheme = useTheme() as typeof theme;

  useEffect(() => {
    if (currentVolume !== undefined) setValues([currentVolume]);
  }, [currentVolume, playbackType]);

  return (
    <VolumeBarContainer
      onMouseLeave={() => setShowThumb(false)}
      onMouseOver={() => setShowThumb(true)}
    >
      <VolumeStateButton
        disabled={currentVolumeValue[0] === 0}
        onClick={() => currentVolumeValue[0] !== 0 && onChangeVolume(0)}
      >
        <VolumeBarButtonIcon currentVolume={currentVolumeValue[0]} />
      </VolumeStateButton>
      <Range
        disabled={isLoading || currentVolume === undefined}
        max={100}
        min={0}
        onChange={values => {
          onChangeVolume(values[0]);
          setValues(values);
        }}
        onFinalChange={values => {
          onChangeVolume(values[0]);
        }}
        renderThumb={({ props, isDragged }) => (
          <Thumb
            {...props}
            style={{
              ...props.style,
              ...(showThumb || isDragged ? {} : { visibility: 'hidden' }),
            }}
          />
        )}
        renderTrack={({ props, children, isDragged }) => (
          <div
            style={{
              backgroundColor: 'transparent',
              width: '100%',
            }}
          >
            <Track
              {...props}
              style={{
                background: getTrackBackground({
                  colors: [
                    showThumb || isDragged
                      ? styledTheme.colors.green
                      : styledTheme.colors.contrast4,
                    styledTheme.colors.contrast3,
                  ],
                  max: 100,
                  min: 0,
                  values: currentVolumeValue,
                }),
              }}
            >
              {children}
            </Track>
          </div>
        )}
        step={1}
        values={currentVolumeValue}
      />
    </VolumeBarContainer>
  );
}
