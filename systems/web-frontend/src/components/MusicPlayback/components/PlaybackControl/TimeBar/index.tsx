import { useEffect, useState } from 'react';
import { getTrackBackground, Range } from 'react-range';
import styled, { useTheme } from 'styled-components';

import { PlaybackType } from '../../../../../contexts/SpotifyWebPlayback';
import type { theme } from '../../../../../contexts/Theme';
import { useInterval } from '../../../../../hooks/utils/useInterval';
import { formatMSToMinute } from '../../../../../utils/formatMS';

const TimeBarTime = styled.div.attrs({
  role: 'timer',
})<{
  'aria-label': string;
}>`
  color: ${props => props.theme.colors.contrast4};
  font-size: ${props => props.theme.typography.size.xxs};
  min-width: 40px;
  text-align: center;
`;

const TimeBarContainer = styled.section`
  align-items: center;
  display: flex;
  width: 100%;
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
  currentProgressMS: number;
  currentTrackId?: string | null;
  disallowSeeking: boolean;
  isLoading: boolean;
  isPaused?: boolean;
  onChangeTrackPlayingPosition: (newPosition: number) => void;
  playbackType: PlaybackType;
  trackDuration?: number;
}

export function TimeBar({
  currentTrackId,
  currentProgressMS,
  disallowSeeking,
  trackDuration,
  isLoading,
  isPaused,
  onChangeTrackPlayingPosition,
  playbackType,
}: Props) {
  const [currentTimeBarValue, setValues] = useState([0]);
  const [showThumb, setShowThumb] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const styledTheme = useTheme() as typeof theme;

  useEffect(
    function resetState() {
      if (currentTrackId === undefined) return;
      if (currentTrackId === null) {
        setValues([0]);
        return;
      }
      if (!isDragging) {
        setValues([currentProgressMS]);
        return;
      }
    },
    [setValues, currentTrackId, currentProgressMS, isDragging],
  );

  useInterval(
    latestSuccessExecuteTime => {
      if (
        isPaused ||
        trackDuration === undefined ||
        isDragging ||
        playbackType === PlaybackType.Local
      )
        return;
      const now = Date.now();
      const patchTime = now - latestSuccessExecuteTime;
      const [currentValue] = currentTimeBarValue;
      const nextValue = currentValue + patchTime;
      const newValue =
        currentValue > trackDuration ? [trackDuration] : [nextValue];
      setValues(newValue);
    },
    1000,
    {
      enabled:
        !(disallowSeeking || isLoading || isDragging) &&
        playbackType !== PlaybackType.Local,
    },
  );
  return (
    <TimeBarContainer
      onMouseLeave={() => setShowThumb(false)}
      onMouseOver={() => setShowThumb(true)}
    >
      <TimeBarTime aria-label="current-time">
        {formatMSToMinute(currentTimeBarValue[0])}
      </TimeBarTime>
      <Range
        disabled={disallowSeeking || isLoading || trackDuration === undefined}
        max={trackDuration ?? 500}
        min={0}
        onChange={values => {
          setIsDragging(true);
          setValues(values);
        }}
        onFinalChange={values => {
          setIsDragging(false);
          onChangeTrackPlayingPosition(values[0]);
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
                  max: trackDuration!,
                  min: 0,
                  values: currentTimeBarValue,
                }),
              }}
            >
              {children}
            </Track>
          </div>
        )}
        step={500}
        values={currentTimeBarValue}
      />
      <TimeBarTime aria-label="duration">
        {trackDuration !== undefined
          ? formatMSToMinute(trackDuration)
          : '--:--'}
      </TimeBarTime>
    </TimeBarContainer>
  );
}
