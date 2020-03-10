import { Fetcher } from '../typings/fetcher.d';

export interface Response {
  playlists: {
    items: Spotify.Playlist[];
  };
}

export const searchPlayLists: Fetcher<Response> = async (
  apiClient,
  query: string,
) => {
  const response = await apiClient.request<
    Response & { next: string | undefined }
  >({
    url: '/search',
    method: 'GET',
    params: {
      type: 'playlist',
      q: query,
    },
  });
  return response;
};
