import { useSpotifyAPIClient } from 'src/hooks/useSpotifyAPIClient';
import useSWR from 'swr';

import type { AlbumFull } from '../typings/Album';

export function useAlbum(albumId: string) {
  const apiClient = useSpotifyAPIClient();
  const { data } = useSWR(['GET', `/albums/${albumId}`], (method, url) =>
    apiClient.request<AlbumFull>({
      method,
      url,
    }),
  );
  return data;
}
