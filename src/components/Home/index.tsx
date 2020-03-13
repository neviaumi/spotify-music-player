import React from 'react';
import styled from 'styled-components';

import withSuspense from '../HOC/withSuspense';
import PlayListByLastPlayedArtist from '../PlayList/PlayListByLastPlayedArtist';
import PlayListByLastPlayedTrack from '../PlayList/PlayListByLastPlayedTrack';
import PlayListByTopArtist from '../PlayList/PlayListByTopArtist';
import PlayListByTopTrack from '../PlayList/PlayListByTopTrack';

const Container = styled.div`
  padding: 0 32px;
`;

export function Home() {
  return (
    <Container data-testid="home-component">
      <PlayListByTopArtist />
      <PlayListByLastPlayedArtist />
      <PlayListByLastPlayedTrack />
      <PlayListByTopTrack />
    </Container>
  );
}

export default withSuspense(Home);
