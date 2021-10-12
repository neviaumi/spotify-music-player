import type { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import type { AlbumFull } from '../typings/Album';
import type { QueryResponse } from '../typings/QueryResponse';

export function useAlbum(albumId: string): QueryResponse<AlbumFull> {
  const apiClient = useSpotifyAPIClient();
  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    url: `/albums/${albumId}`,
  };
  const { data } = useQuery([queryParams.method, queryParams.url], () => {
    const { method, url } = queryParams;
    return apiClient.request<AlbumFull>({
      method,
      url,
    });
  });
  return data;
}
