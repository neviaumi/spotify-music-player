import React from 'react';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import searchPlayLists from '../../services/spotify/search/searchPlayLists';
import withSuspense from '../HOC/withSuspense';
import PresentPlayList from './Present';

export function Home() {
  const apiClient = useSpotifyAPIClient();
  const playlists = useDataFetcher('search/playlists', () =>
    searchPlayLists(apiClient, 'endy chow'),
  );
  return (
    <div data-testid="home-component">
      <PresentPlayList
        title="Show PlayList"
        playlists={playlists.data.playlists?.items}
      />
    </div>
  );
}

export default withSuspense(Home);
