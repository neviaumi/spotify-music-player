import { useEffect, useState } from 'react';
import { getTrackBackground, Range } from 'react-range';
import styled, { useTheme } from 'styled-components';

import { useInterval } from '../../../../../hooks/utils/useInterval';
import { formatMSToMinute } from '../../../../../utils/formatMS';

const TimeBarTime = styled.div.attrs({
  role: 'timer',
})<{
  'aria-label': string;
}>`
  min-width: 40px;
  color: ${props => props.theme.colors.grey179};
  font-size: 11px;
  text-align: center;
`;

const TimeBarContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Thumb = styled.button`
  background-color: ${props => props.theme.colors.white};
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
  background-color: ${props => props.theme.colors.grey83};
`;

export interface Props {
  currentProgressMS: number;
  currentTrackId?: string | null;
  disallowSeeking: boolean;
  isLoading: boolean;
  isPaused?: boolean;
  onChangeTrackPlayingPosition: (newPosition: number) => void;
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
}: Props) {
  const [currentTimeBarValue, setValues] = useState([0]);
  const [showThumb, setShowThumb] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const styledTheme: any = useTheme();

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
      if (isPaused || trackDuration === undefined || isDragging) return;
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
      enabled: !(disallowSeeking || isLoading || isDragging),
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
        disabled={disallowSeeking || isLoading}
        max={trackDuration}
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
                      : styledTheme.colors.grey179,
                    styledTheme.colors.grey83,
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
