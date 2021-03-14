import type { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import type { TrackSimplified } from '../typings/Track';

interface Response {
  items: { track: TrackSimplified }[];
}

export function useRecentPlayedTrack() {
  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    url: '/me/player/recently-played',
  };
  const apiClient = useSpotifyAPIClient();
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
  return data;
}
