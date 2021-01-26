import useSWR from 'swr';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import type { PlaylistSimplified } from '../typings/Playlist';

interface Response {
  items: PlaylistSimplified[];
}

export function useUserPlayList() {
  const apiClient = useSpotifyAPIClient();
  const { data } = useSWR(['GET', '/me/playlists'], (method, url) =>
    apiClient.request<Response>({
      method,
      params: {
        limit: 50,
      },
      url,
    }),
  );
  return data!;
}
