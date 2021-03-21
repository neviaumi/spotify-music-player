import styled from 'styled-components';

import { ControlButtons, Props as ControlButtonsProps } from './ControlButtons';
import { Props as TimeBarProps, TimeBar } from './TimeBar';

const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 40%;
  max-width: 722px;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  controlButtons: ControlButtonsProps;
  timeBar: TimeBarProps;
}

export function PlaybackControl({ controlButtons, timeBar }: Props) {
  return (
    <Container>
      <ControlButtons {...controlButtons} />
      <TimeBar {...timeBar} />
    </Container>
  );
}
