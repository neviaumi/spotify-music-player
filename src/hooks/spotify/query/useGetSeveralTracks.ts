import type { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';

export function useGetSeveralTracks(trackIds: string[]) {
  const apiClient = useSpotifyAPIClient();
  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    params: {
      ids: trackIds?.sort().join(','),
    },
    url: '/tracks',
  };
  const { data } = useQuery(
    [queryParams.method, queryParams.url, queryParams.params.ids],
    () => {
      const { method, params, url } = queryParams;
      return apiClient.request({
        method,
        params: params,
        url,
      });
    },
    {
      enabled: trackIds !== undefined,
    },
  );
  return data;
}
