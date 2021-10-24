import type { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

import { useSpotifyAPIClient } from '../../useSpotifyAPIClient';
import type { ArtistFull } from '../typings/Artist';
import type { QueryResponse } from '../typings/QueryResponse';
import type { Paging } from '../typings/shared/Paging';
import type { TrackFull } from '../typings/Track';

export enum QueryType {
  ARTIST = 'artists',
  TRACK = 'tracks',
}

interface UseUserTopHooks {
  (type: QueryType.ARTIST): QueryResponse<Paging<ArtistFull>>;
  (type: QueryType.TRACK): QueryResponse<Paging<TrackFull>>;
}

export const useUserTop: UseUserTopHooks = function useUserTop(
  type: QueryType,
) {
  const queryParams: AxiosRequestConfig = {
    method: 'GET',
    url: `/me/top/${type}`,
  };
  const apiClient = useSpotifyAPIClient();
  const { data } = useQuery([queryParams.method, queryParams.url], () => {
    const { method, url } = queryParams;
    return apiClient.request<unknown, any>({
      method,
      params: {
        limit: 50,
        time_range: 'short_term',
      },
      url,
    });
  });
  return data;
};
