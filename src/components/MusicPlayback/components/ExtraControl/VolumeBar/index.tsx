import { useEffect, useState } from 'react';
import { getTrackBackground, Range } from 'react-range';
import styled, { useTheme } from 'styled-components';

import type { PlaybackType } from '../../../../../contexts/SpotifyWebPlayback/states/PlaybackState';
import type { theme } from '../../../../../contexts/Theme';
import { ReactComponent as VolumeHigh } from './volume-high.svg';
import { ReactComponent as VolumeLow } from './volume-low.svg';
import { ReactComponent as VolumeMedium } from './volume-medium.svg';
import { ReactComponent as VolumeOff } from './volume-off.svg';

const VolumeBarContainer = styled.section`
  width: 125px;
  display: flex;
  align-items: center;
`;

const VolumeStateButton = styled.button`
  border: 0;
  outline: 0;
  background-color: transparent;
  width: 32px;
  min-width: 32px;
  height: 32px;
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
  outline: 0;
  border: 0px;
  border-radius: 50%;
  height: 12px;
  width: 12px;
`;

const Track = styled.div`
  height: 4px;
  border-radius: 2px;
  width: 100%;
  background-color: ${props => props.theme.colors.contrast3};
`;

export interface Props {
  currentVolume?: number;
  isLoading: boolean;
  onChangeVolume: (newVolume: number) => void;
  playbackType: PlaybackType;
}

function VolumeBarButtonIcon({ currentVolume }: { currentVolume?: number }) {
  if (!currentVolume || currentVolume === 0) return <VolumeOff />;
  const interval = 100 / 3;
  switch (Math.ceil(currentVolume / interval)) {
    case 1:
      return <VolumeLow />;
    case 2:
      return <VolumeMedium />;
    default:
      return <VolumeHigh />;
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
        onClick={() => currentVolumeValue[0] !== 0 && onChangeVolume(0)}
      >
        <VolumeBarButtonIcon currentVolume={currentVolumeValue[0]} />
      </VolumeStateButton>
      <Range
        disabled={isLoading}
        max={100}
        min={0}
        onChange={values => {
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
