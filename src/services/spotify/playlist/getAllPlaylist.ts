import { Fetcher } from '../typings/fetcher';

export interface Response {
  items: Spotify.Playlist[];
}

const getAllPlaylist: Fetcher<Response> = async apiClient => {
  return apiClient.request<Response>({
    url: '/me/playlists',
    method: 'GET',
  });
};

export default getAllPlaylist;
