import type { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import type { PlaylistFull } from '../typings/Playlist';

export function usePlayList(playListId: string) {
  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    url: `/playlists/${playListId}`,
  };
  const apiClient = useSpotifyAPIClient();
  const { data } = useQuery([queryParams.method, queryParams.url], () => {
    const { method, url } = queryParams;
    return apiClient.request<PlaylistFull>({
      method,
      url,
    });
  });
  return data!;
}
