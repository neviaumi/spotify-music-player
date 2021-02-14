import type { ConfigInterface } from 'swr';
import useSWR from 'swr';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';

export function useGetUsersCurrentlyPlayingTrack(
  enabled: boolean,
  config: ConfigInterface,
) {
  const apiClient = useSpotifyAPIClient();
  const { data, error } = useSWR(
    enabled ? ['GET', '/me/player/currently-playing'] : null,
    async (method, url) => {
      const { data: responseBody, status } = await apiClient.request({
        method,
        params: {
          additional_types: 'track',
        },
        url,
      });
      // https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-the-users-currently-playing-track
      // 204 NO CONTENT mean no current track available
      if (status === 204) return null;
      const { currently_playing_type } = responseBody;
      return currently_playing_type === 'track' ? responseBody : null;
    },
    config,
  );
  return { data, error };
}
