import useSWR from 'swr';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import type { TrackSimplified } from '../typings/Track';

interface Response {
  items: { track: TrackSimplified }[];
}

export function useRecentPlayedTrack() {
  const apiClient = useSpotifyAPIClient();
  const { data } = useSWR(
    ['GET', '/me/player/recently-played'],
    (method, url) =>
      apiClient.request<Response>({
        method,
        params: {
          limit: 50,
        },
        url,
      }),
  );
  return data!;
}
