import styled from 'styled-components';

import { SuggestAlbumBySpotifyTopStreamTracks } from './components/SuggestAlbumBySpotifyTopStreamTracks';
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
      <SuggestAlbumBySpotifyTopStreamTracks />
      <SuggestPlayListByUserTopArtist />
      <SuggestPlayListByUserLastPlayedArtist />
      <SuggestPlayListByUserTopTrack />
      <SuggestPlayListByUserLastPlayedTrack />
    </Container>
  );
}
