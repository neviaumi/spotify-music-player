import type { Fetcher } from '../typings/fetcher';

export interface Response {
  items: { track: Spotify.Track }[];
}

const getRecentlyPlayed: Fetcher<Response> = async apiClient =>
  apiClient.request<Response>({
    url: '/me/player/recently-played',
    method: 'GET',
  });
export default getRecentlyPlayed;
