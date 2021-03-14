import type { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import { useUserCountry } from '../../useUserCountry';
import type { PlaylistSimplified } from '../typings/Playlist';
import type { Paging } from '../typings/shared/Paging';

interface Response {
  message: string;
  playlists: Paging<PlaylistSimplified>;
}

export function useFeaturedPlaylists() {
  const apiClient = useSpotifyAPIClient();
  const country = useUserCountry();

  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    params: {
      country,
      locale: navigator.language.replace('-', '_'),
    },
    url: 'browse/featured-playlists',
  };
  const { data } = useQuery(
    [
      queryParams.method,
      queryParams.url,
      queryParams.params.country,
      queryParams.params.locale,
    ],
    () => {
      const { method, params, url } = queryParams;
      return apiClient.request<Response>({
        method,
        params: {
          ...params,
          limit: 50,
        },
        url,
      });
    },
    {
      enabled: country !== undefined,
    },
  );
  return data;
}
