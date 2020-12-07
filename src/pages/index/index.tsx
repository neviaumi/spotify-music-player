import styled from 'styled-components';

import SuggestPlayListByLastPlayedArtist from './components/SuggestPlayListByLastPlayedArtist';
import SuggestPlayListByLastPlayedTrack from './components/SuggestPlayListByLastPlayedTrack';
import SuggestPlayListByTopArtist from './components/SuggestPlayListByTopArtist';
import SuggestPlayListByTopTrack from './components/SuggestPlayListByTopTrack';

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
