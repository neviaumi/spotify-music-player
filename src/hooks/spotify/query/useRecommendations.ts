import { isEmpty } from 'ramda';
import useSWR from 'swr';

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
  const apiClient = useSpotifyAPIClient();
  const { data } = useSWR(
    !isEmpty(seeds)
      ? ['GET', '/recommendations', seeds.slice(0, 5).join(','), seedType]
      : null,
    (method, url, recommendationSeeds, recommendationSeedType) =>
      apiClient.request<Response>({
        method,
        params: {
          limit: 100,
          [recommendationSeedType]: recommendationSeeds,
        },
        url,
      }),
  );
  return data;
}
