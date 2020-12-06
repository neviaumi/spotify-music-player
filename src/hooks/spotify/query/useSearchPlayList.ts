import useSWR from 'swr';

import useSpotifyAPIClient from '../../useSpotifyAPIClient';
import type { PlaylistSimplified } from '../typings/Playlist';

interface Response {
  playlists: { items: PlaylistSimplified[] };
}

export default function useSearchPlayList(query?: string) {
  const apiClient = useSpotifyAPIClient();
  const { data } = useSWR(
    () => (query ? ['GET', `/search`, 'playlist', query] : null),
    (method, url, searchType, queryString) =>
      apiClient.request<Response>({
        method,
        params: {
          q: queryString,
          type: searchType,
        },
        url,
      }),
  );
  return data!;
}
