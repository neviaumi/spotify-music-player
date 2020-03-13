import { Fetcher } from '../typings/fetcher';

export type Response = Spotify.Artist;

const getArtist: Fetcher<Response> = async (apiClient, id: string) =>
  apiClient.request<Response>({
    url: `artists/${id}`,
    method: 'GET',
  });
export default getArtist;
