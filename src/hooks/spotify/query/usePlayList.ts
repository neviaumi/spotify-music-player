import useSWR from 'swr';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import type { PlaylistFull } from '../typings/Playlist';

export function usePlayList(playListId: string) {
  const apiClient = useSpotifyAPIClient();
  const { data } = useSWR(['GET', `/playlists/${playListId}`], (method, url) =>
    apiClient.request<PlaylistFull>({
      method,
      url,
    }),
  );
  return data!;
}
