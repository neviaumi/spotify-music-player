import type { Fetcher } from '../typings/fetcher';

export type Response = Spotify.Album;

const getAlbum: Fetcher<Response> = async (apiClient, id: string) =>
  apiClient.request<Response>({
    url: `albums/${id}`,
    method: 'GET',
  });
export default getAlbum;
