import React from 'react';
import styled from 'styled-components';

import withSuspense from '../HOC/withSuspense';
import PlayListByTopTrack from './PlayListByTopTrack';

const Container = styled.div`
  padding: 0 32px;
`;

export function Home() {
  return (
    <Container data-testid="home-component">
      <PlayListByTopTrack />
    </Container>
  );
}

export default withSuspense(Home);
