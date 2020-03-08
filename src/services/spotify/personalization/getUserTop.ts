import { AxiosInstance, AxiosResponse } from 'axios';

export interface Response<T> {
  items: T[];
}

export enum Type {
  ARTIST = 'artists',
  TRACK = 'tracks',
}

interface GetUserTopFetcher {
  (apiClient: AxiosInstance, type: Type.ARTIST): Promise<
    AxiosResponse<Response<Spotify.Artist>>
  >;
  (apiClient: AxiosInstance, type: Type.TRACK): Promise<
    AxiosResponse<Response<Spotify.Track>>
  >;
}

const getUserTop: GetUserTopFetcher = async (
  apiClient: AxiosInstance,
  type: Type,
) =>
  apiClient.request({
    url: `/me/top/${type}`,
    method: 'GET',
    params: {
      time_range: 'short_term',
    },
  });
export default getUserTop;
