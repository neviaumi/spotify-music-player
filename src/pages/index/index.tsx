import styled from 'styled-components';

import { SuggestPlayListByUserLastPlayedArtist } from './components/SuggestPlayListByUserLastPlayedArtist';
import { SuggestPlayListByUserLastPlayedTrack } from './components/SuggestPlayListByUserLastPlayedTrack';
import { SuggestPlayListByUserTopArtist } from './components/SuggestPlayListByUserTopArtist';
import { SuggestPlayListByUserTopTrack } from './components/SuggestPlayListByUserTopTrack';

const Container = styled.div`
  padding: 0 32px;
`;

export function Suggestion() {
  return (
    <Container data-testid="user-suggestion">
      <SuggestPlayListByUserTopArtist />
      <SuggestPlayListByUserLastPlayedArtist />
      <SuggestPlayListByUserTopTrack />
      <SuggestPlayListByUserLastPlayedTrack />
    </Container>
  );
}
