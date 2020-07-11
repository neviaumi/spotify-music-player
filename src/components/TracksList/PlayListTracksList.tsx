import React from 'react';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import getPlayListItems from '../../services/spotify/playlist/getPlayListItems';
import withSuspense from '../HOC/withSuspense';

interface Props {
  playListId: string;
}

export function PlayListTracksList({ playListId }: Props) {
  const apiClient = useSpotifyAPIClient();
  const { data: playlist } = useDataFetcher(`playlist-${playListId}`, () =>
    getPlayListItems(apiClient, playListId),
  );
  return (
    <pre data-testid="playlist-tracks-list">
      {JSON.stringify(playlist, null, 4)}
    </pre>
  );
}

export default withSuspense(PlayListTracksList);
