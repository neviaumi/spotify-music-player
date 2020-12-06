import type { AxiosResponse } from 'axios';
import useSWR from 'swr';

import useSpotifyAPIClient from '../../useSpotifyAPIClient';
import type { ArtistFull } from '../typings/Artist';
import type { Paging } from '../typings/shared/Paging';
import type { TrackFull } from '../typings/Track';

export enum QueryType {
  ARTIST = 'artists',
  TRACK = 'tracks',
}

interface UseUserTopHooks {
  (type: QueryType.ARTIST): AxiosResponse<Paging<ArtistFull>>;
  (type: QueryType.TRACK): AxiosResponse<Paging<TrackFull>>;
}

const useUserTop: UseUserTopHooks = function useUserTop(type: QueryType) {
  const apiClient = useSpotifyAPIClient();
  const { data } = useSWR(['GET', `/me/top/${type}`], (method, url) =>
    apiClient.request({
      method,
      params: {
        time_range: 'short_term',
      },
      url,
    }),
  );
  return data!;
};

export default useUserTop;