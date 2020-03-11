import React from 'react';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import searchPlayLists from '../../services/spotify/search/searchPlayLists';
import withSuspense from '../HOC/withSuspense';

export function Home() {
  const apiClient = useSpotifyAPIClient();
  const playlists = useDataFetcher('search/playlists', () =>
    searchPlayLists(apiClient, 'endy chow'),
  );
  return (
    <div data-testid="home-component">
      {playlists.data.playlists?.items.map(playlist => (
        <div key={playlist.id}>{playlist.name}</div>
      ))}
    </div>
  );
}

export default withSuspense(Home);
