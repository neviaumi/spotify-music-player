import React from 'react';
import styled from 'styled-components';

import SuggestPlayListByLastPlayedArtist from '../../components/Suggestion/SuggestPlayListByLastPlayedArtist';
import SuggestPlayListByLastPlayedTrack from '../../components/Suggestion/SuggestPlayListByLastPlayedTrack';
import SuggestPlayListByTopArtist from '../../components/Suggestion/SuggestPlayListByTopArtist';
import SuggestPlayListByTopTrack from '../../components/Suggestion/SuggestPlayListByTopTrack';

const Container = styled.div`
  padding: 0 32px;
`;

export default function Suggestion() {
  return (
    <Container data-testid="user-suggestion">
      <SuggestPlayListByTopArtist />
      <SuggestPlayListByLastPlayedArtist />
      <SuggestPlayListByTopTrack />
      <SuggestPlayListByLastPlayedTrack />
    </Container>
  );
}
