import React, { Suspense } from 'react';
import styled from 'styled-components';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import getAllPlaylist from '../../services/spotify/playlist/getAllPlaylist';

const Container = styled.div`
  height: 513px;
`;

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
    <Container>
      {response?.data.items.map(item => (
        <div data-testid="user-playlist" key={item.id}>
          {item.name}
        </div>
      ))}
    </Container>
  );
}

export default () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Playlist />
    </Suspense>
  );
};
