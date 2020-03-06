import { Fetcher } from '../typings/fetcher';

export interface Response {
  items: Spotify.Playlist[];
}

const getAllPlaylist: Fetcher<Response> = async (
  apiClient,
  offset: number = 0,
  playlists: Spotify.Playlist[] = [],
) => {
  const response = await apiClient.request<
    Response & { next: string | undefined }
  >({
    url: '/me/playlists',
    method: 'GET',
    params: {
      offset,
    },
  });
  const {
    data: { items, next },
  } = response;
  if (next) {
    return await getAllPlaylist(apiClient, offset + items.length, [
      ...playlists,
      ...items,
    ]);
  }
  return Object.assign(response, {
    data: {
      ...response.data,
      items: [...playlists, ...response.data.items],
    },
  });
};

export default getAllPlaylist;
