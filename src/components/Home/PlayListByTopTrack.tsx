import React from 'react';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import getPlayListByTopTrack from '../../services/spotify/playlist/getPlayListByTopTrack';
import withSuspense from '../HOC/withSuspense';
import PresentPlayList from './Present';

export function PlayListByTopTrack() {
  const apiClient = useSpotifyAPIClient();
  const response = useDataFetcher(
    ['search/playlist', 'by-last-played-track'],
    () => getPlayListByTopTrack(apiClient),
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
