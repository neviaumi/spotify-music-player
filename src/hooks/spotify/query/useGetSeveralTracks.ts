import useSWR from 'swr';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';

export function useGetSeveralTracks(trackIds: string[]) {
  const apiClient = useSpotifyAPIClient();
  const { data } = useSWR(
    trackIds ? ['GET', '/tracks', trackIds.join(',')] : null,
    async (method, url, ids) =>
      apiClient.request({
        method: method,
        params: {
          ids,
        },
        url: url,
      }),
  );
  return data;
}
