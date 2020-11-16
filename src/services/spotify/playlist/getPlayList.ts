import type { Fetcher } from '../typings/fetcher';

const getPlayList: Fetcher<Spotify.Playlist> = async (
  apiClient,
  playListId: string,
) => {
  return apiClient.request({
    method: 'GET',
    url: `/playlists/${playListId}`,
  });
};

export default getPlayList;
