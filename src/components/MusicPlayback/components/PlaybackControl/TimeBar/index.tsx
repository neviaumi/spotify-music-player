import { useState } from 'react';
import { getTrackBackground, Range } from 'react-range';
import styled, { useTheme } from 'styled-components';

import { formatMSToMinute } from '../../../../../utils/formatMS';

const TimeBarTime = styled.div`
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

export function TimeBar() {
  const [currentValue, setValues] = useState([0]);
  const [showThumb, setShowThumb] = useState(true);
  const styledTheme: any = useTheme();

  return (
    <TimeBarContainer
      onMouseLeave={() => setShowThumb(false)}
      onMouseOver={() => setShowThumb(true)}
    >
      <TimeBarTime>{formatMSToMinute(currentValue[0])}</TimeBarTime>
      <Range
        max={300000}
        min={0}
        onChange={values => setValues(values)}
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
                  max: 300000,
                  min: 0,
                  values: currentValue,
                }),
              }}
            >
              {children}
            </Track>
          </div>
        )}
        step={500}
        values={currentValue}
      />
      <TimeBarTime>{formatMSToMinute(300000)}</TimeBarTime>
    </TimeBarContainer>
  );
}
