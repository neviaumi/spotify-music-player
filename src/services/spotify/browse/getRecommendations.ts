import type { Fetcher } from '../typings/fetcher';

export interface Response {
  tracks: Spotify.Track[];
}

export enum SeedType {
  ARTIST = 'artist',
  TRACK = 'track',
}

const constructQueryParams = (seedType: SeedType, seeds: string[]) => {
  if (seedType === SeedType.ARTIST) {
    return {
      seed_artists: seeds.slice(0, 5).join(','),
    };
  } else if (seedType === SeedType.TRACK) {
    return {
      seed_tracks: seeds.slice(0, 5).join(','),
    };
  }
  return {};
};

const getRecommendations: Fetcher<Response> = async (
  apiClient,
  seedType: SeedType,
  seeds: string[],
) =>
  apiClient.request<Response>({
    url: `/recommendations`,
    method: 'GET',
    params: constructQueryParams(seedType, seeds),
  });

export default getRecommendations;
