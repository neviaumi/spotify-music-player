import React from 'react';
import styled from 'styled-components';

import withSuspense from '../HOC/withSuspense';
import ByLastPlayedTrack from './ByLastPlayedTrack';

const Container = styled.div`
  padding: 0 32px;
`;

export function Home() {
  return (
    <Container data-testid="home-component">
      <ByLastPlayedTrack />
    </Container>
  );
}

export default withSuspense(Home);
