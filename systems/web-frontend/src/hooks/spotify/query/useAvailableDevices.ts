import type { AxiosRequestConfig } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import type { QueryResponse } from '../typings/QueryResponse';
import type { UserDevice } from '../typings/UserDevice';

interface Response {
  devices: UserDevice[];
}

export function useAvailableDevices(
  options: UseQueryOptions<QueryResponse<Response>> = {},
) {
  const apiClient = useSpotifyAPIClient();
  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    url: '/me/player/devices',
  };
  return useQuery<QueryResponse<Response>>(
    [queryParams.method, queryParams.url],
    async () => {
      const { method, url } = queryParams;
      const { data } = await apiClient.request<Response>({
        method,
        url,
      });
      return { data };
    },
    options,
  );
}
