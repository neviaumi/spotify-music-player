import React from 'react';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import searchPlayListsByTopArtist from '../../services/spotify/search/searchPlayListsByTopArtist';
import withSuspense from '../HOC/withSuspense';
import PresentPlayList from './Present/PresentPlayListLarge';

export function PlayListByTopArtist() {
  const apiClient = useSpotifyAPIClient();
  const response = useDataFetcher(['search/playlist', 'by-top-artist'], () =>
    searchPlayListsByTopArtist(apiClient),
  );

  return (
    <PresentPlayList
      title={`${response.data.artist?.name}`}
      playlists={response.data.playlists}
      data-testid="playlist-by-top-artist"
    />
  );
}

export default withSuspense(PlayListByTopArtist);
