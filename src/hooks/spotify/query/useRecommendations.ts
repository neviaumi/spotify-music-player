import type { AxiosRequestConfig } from 'axios';
import { isEmpty } from 'ramda';
import { useQuery } from 'react-query';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import type { TrackSimplified } from '../typings/Track';

export enum SeedType {
  SeedArtists = 'seed_artists',
  SeedGenres = 'seed_genres',
  SeedTracks = 'seed_tracks',
}

interface Response {
  tracks: TrackSimplified[];
}
export function useRecommendations(seeds: string[], seedType: SeedType) {
  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    params: {
      [seedType]: seeds.sort().slice(0, 5).join(','),
    },
    url: '/recommendations',
  };
  const apiClient = useSpotifyAPIClient();
  const { data } = useQuery(
    [
      queryParams.method,
      queryParams.url,
      seedType,
      queryParams.params[seedType],
    ],
    () => {
      const { method, params, url } = queryParams;
      return apiClient.request<Response>({
        method,
        params: {
          ...params,
          limit: 100,
        },
        url,
      });
    },
    {
      enabled: !isEmpty(seeds),
    },
  );
  return data;
}
