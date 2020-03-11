import React from 'react';
import styled from 'styled-components';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import searchPlayLists from '../../services/spotify/search/searchPlayLists';
import withSuspense from '../HOC/withSuspense';
import PresentPlayList from './Present';

const Container = styled.div`
  padding: 0 32px;
`;

export function Home() {
  const apiClient = useSpotifyAPIClient();
  const playlists = useDataFetcher('search/playlists', () =>
    searchPlayLists(apiClient, 'endy chow'),
  );
  return (
    <Container data-testid="home-component">
      <PresentPlayList
        title="Show PlayList"
        playlists={playlists.data.playlists?.items}
      />
    </Container>
  );
}

export default withSuspense(Home);
