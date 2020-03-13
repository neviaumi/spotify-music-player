import React from 'react';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import searchPlayListsByTopTrackArtist from '../../services/spotify/search/searchPlayListsByTopTrackArtist';
import withSuspense from '../HOC/withSuspense';
import PresentPlayList from './Present/PresentPlayListLarge';

export function PlayListByTopTrack() {
  const apiClient = useSpotifyAPIClient();
  const response = useDataFetcher(
    ['search/playlist', 'by-last-played-track'],
    () => searchPlayListsByTopTrackArtist(apiClient),
  );

  return (
    <PresentPlayList
      title={`More track by ${response.data.artist?.name}`}
      playlists={response.data.playlists}
      data-testid="playlist-from-last-played-track"
    />
  );
}

export default withSuspense(PlayListByTopTrack);
