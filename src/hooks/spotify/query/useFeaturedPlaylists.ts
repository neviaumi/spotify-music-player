import useSWR from 'swr';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import { useUserCountry } from '../../useUserCountry';
import type { PlaylistSimplified } from '../typings/Playlist';
import type { Paging } from '../typings/shared/Paging';

interface Response {
  message: string;
  playlists: Paging<PlaylistSimplified>;
}

export function useFeaturedPlaylists() {
  const apiClient = useSpotifyAPIClient();
  const country = useUserCountry();

  const { data } = useSWR(
    country
      ? ['GET', 'browse/featured-playlists', country, navigator.language]
      : null,
    (method, url, requestCountry, locale) =>
      apiClient.request<Response>({
        method,
        params: {
          country: requestCountry,
          limit: 50,
          locale: locale.replace('-', '_'),
        },
        url,
      }),
  );
  return data;
}
