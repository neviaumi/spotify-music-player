import React from 'react';
import styled from 'styled-components';

import withSuspense from '../HOC/withSuspense';
import PlayListByLastPlayedArtist from './PlayListByLastPlayedArtist';
import PlayListByLastPlayedTrack from './PlayListByLastPlayedTrack';
import PlayListByTopArtist from './PlayListByTopArtist';
import PlayListByTopTrack from './PlayListByTopTrack';

const Container = styled.div`
  padding: 0 32px;
`;

export function PlayListSuggestion() {
  return (
    <Container data-testid="play-list-suggestion">
      <PlayListByTopArtist />
      <PlayListByLastPlayedArtist />
      <PlayListByLastPlayedTrack />
      <PlayListByTopTrack />
    </Container>
  );
}

export default withSuspense(PlayListSuggestion);
