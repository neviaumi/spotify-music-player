import { Fetcher } from '../typings/fetcher';

export interface Response {
  playlists: {
    items: Spotify.Playlist[];
  };
}

const getCategoryPlayList: Fetcher<Response> = async (
  apiClient,
  categoryId: string,
) => {
  return await apiClient.request<Response>({
    url: `browse/categories/${categoryId}/playlists`,
    method: 'GET',
  });
};

export default getCategoryPlayList;
