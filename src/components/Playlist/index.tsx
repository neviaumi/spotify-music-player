import React, { Suspense } from 'react';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import getAllPlaylist from '../../services/spotify/playlist/getAllPlaylist';

export function Playlist() {
  const apiClient = useSpotifyAPIClient();
  const { data: response } = useDataFetcher(
    'me/playlists',
    () => getAllPlaylist(apiClient),
    {
      suspense: true,
    },
  );
  return (
    <div>
      {response?.data.items.map(item => (
        <div data-testid="user-playlist" key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Playlist />
    </Suspense>
  );
};
