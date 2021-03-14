import type { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import type { PlaylistSimplified } from '../typings/Playlist';

interface Response {
  playlists: { items: PlaylistSimplified[] };
}

export function useSearchPlayList(query?: string) {
  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    params: {
      q: query,
      type: 'playlist',
    },
    url: '/search',
  };
  const apiClient = useSpotifyAPIClient();
  const { data } = useQuery(
    [
      queryParams.method,
      queryParams.url,
      queryParams.params.type,
      queryParams.params.q,
    ],
    () => {
      const { method, params, url } = queryParams;
      return apiClient.request<Response>({
        method,
        params,
        url,
      });
    },
    {
      enabled: query !== undefined,
    },
  );
  return data!;
}
