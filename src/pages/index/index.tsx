import styled from 'styled-components';

import { AlbumByTopStreamTracks } from './components/AlbumByTopStreamTracks';
import { FeaturedPlayListsBySpotify } from './components/FeaturedPlayListsBySpotify';
import { SuggestAlbumByUserLastPlayedArtists } from './components/SuggestAlbumByUserLastPlayedArtists';
import { SuggestAlbumByUserLastPlayedTracks } from './components/SuggestAlbumByUserLastPlayedTracks';
import { SuggestAlbumByUserTopArtistGenres } from './components/SuggestAlbumByUserTopArtistGenres';
import { SuggestAlbumByUserTopArtists } from './components/SuggestAlbumByUserTopArtists';
import { SuggestAlbumByUserTopTracks } from './components/SuggestAlbumByUserTopTracks';

const Container = styled.div`
  padding: 0 32px;
`;

export function Suggestion() {
  return (
    <Container data-testid="user-suggestion">
      <FeaturedPlayListsBySpotify />
      <SuggestAlbumByUserTopArtists />
      <AlbumByTopStreamTracks />
      <SuggestAlbumByUserTopTracks />
      <SuggestAlbumByUserTopArtistGenres />
      <SuggestAlbumByUserLastPlayedTracks />
      <SuggestAlbumByUserLastPlayedArtists />
    </Container>
  );
}
