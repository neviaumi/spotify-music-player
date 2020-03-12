import { Fetcher } from '../typings/fetcher.d';

export interface Response {
  playlists: {
    items: Spotify.Playlist[];
  };
}

const searchPlayLists: Fetcher<Response> = async (apiClient, query: string) => {
  const response = await apiClient.request<Response>({
    url: '/search',
    method: 'GET',
    params: {
      type: 'playlist',
      q: query,
    },
  });
  return response;
};

export default searchPlayLists;
