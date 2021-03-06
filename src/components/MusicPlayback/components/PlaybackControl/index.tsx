import styled from 'styled-components';

import { ControlButtons, Props as ControlButtonsProps } from './ControlButtons';

const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 40%;
  max-width: 722px;
`;

interface Props {
  controlButtons: ControlButtonsProps;
}

export function PlaybackControl({ controlButtons }: Props) {
  return (
    <Container>
      <ControlButtons {...controlButtons} />
    </Container>
  );
}
