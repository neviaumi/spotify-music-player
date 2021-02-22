import styled from 'styled-components';

import { ControlButtons } from './ControlButtons';

const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 40%;
  max-width: 722px;
`;

export function PlaybackControl() {
  return (
    <Container>
      <ControlButtons />
    </Container>
  );
}
