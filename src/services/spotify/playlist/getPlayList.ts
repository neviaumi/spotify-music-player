import type { Fetcher } from '../typings/fetcher';

const getPlayList: Fetcher<Spotify.Playlist> = async (
  apiClient,
  playListId: string,
) => {
  return apiClient.request({
    url: `/playlists/${playListId}`,
    method: 'GET',
  });
};

export default getPlayList;
