import axios from 'axios';
import React, { Suspense } from 'react';
import useSWR from 'swr';

import useAccessToken from '../../hooks/useAccessToken';

export function Playlist() {
  const { getAccessInfo } = useAccessToken();
  const accessToken = getAccessInfo();
  const { data: response } = useSWR(
    'me/playlist',
    () =>
      axios({
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    {
      suspense: true,
    },
  );
  return (
    <div>
      {response?.data.items.map((item: any) => (
        <div key={item.id}>{item.name}</div>
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
