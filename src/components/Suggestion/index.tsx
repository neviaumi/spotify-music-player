import React from 'react';
import styled from 'styled-components';

import withSuspense from '../HOC/withSuspense';
import SuggestPlayListByLastPlayedArtist from './SuggestPlayListByLastPlayedArtist';
import SuggestPlayListByLastPlayedTrack from './SuggestPlayListByLastPlayedTrack';
import SuggestPlayListByTopArtist from './SuggestPlayListByTopArtist';
import SuggestPlayListByTopTrack from './SuggestPlayListByTopTrack';

const Container = styled.div`
  padding: 0 32px;
`;

export function Index() {
  return (
    <Container data-testid="user-suggestion">
      <SuggestPlayListByTopArtist />
      <SuggestPlayListByLastPlayedArtist />
      <SuggestPlayListByTopTrack />
      <SuggestPlayListByLastPlayedTrack />
    </Container>
  );
}

export default withSuspense(Index);
