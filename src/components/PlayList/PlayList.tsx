import React from 'react';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import getPlayList from '../../services/spotify/playlist/getPlayList';
import withSuspense from '../HOC/withSuspense';

interface Props {
  playListId: string;
}

export function PlayList({ playListId }: Props) {
  const apiClient = useSpotifyAPIClient();
  const { data: playlist } = useDataFetcher(`playlist-${playListId}`, () =>
    getPlayList(apiClient, playListId),
  );
  return (
    <pre data-testid="playlist-info">{JSON.stringify(playlist, null, 4)}</pre>
  );
}

export default withSuspense(PlayList);
