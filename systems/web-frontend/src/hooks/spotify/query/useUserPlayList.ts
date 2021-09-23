import type { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import type { PlaylistSimplified } from '../typings/Playlist';

interface Response {
  items: PlaylistSimplified[];
}

export function useUserPlayList() {
  const apiClient = useSpotifyAPIClient();
  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    url: '/me/playlists',
  };
  const { data } = useQuery([queryParams.method, queryParams.url], () => {
    const { method, url } = queryParams;
    return apiClient.request<Response>({
      method,
      params: {
        limit: 50,
      },
      url,
    });
  });
  return data!;
}
