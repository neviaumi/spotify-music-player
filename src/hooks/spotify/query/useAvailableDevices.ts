import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import { useSpotifyAPIClient } from 'src/hooks/useSpotifyAPIClient';

import type { UserDevice } from '../typings/UserDevice';

interface Response {
  devices: UserDevice[];
}

export function useAvailableDevices(
  options: UseQueryOptions<AxiosResponse<Response>> = {},
) {
  const apiClient = useSpotifyAPIClient();
  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    url: '/me/player/devices',
  };
  const result = useQuery<AxiosResponse<Response>>(
    [queryParams.method, queryParams.url],
    () => {
      const { method, url } = queryParams;
      return apiClient.request<Response>({
        method,
        url,
      });
    },
    options,
  );
  return result;
}
