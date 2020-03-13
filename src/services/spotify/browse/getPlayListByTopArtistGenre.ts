import getUserTop, { Type } from '../personalization/getUserTop';
import { Fetcher } from '../typings/fetcher';
import getCategoryPlayList from './getCategoryPlayList';
import isCategoryExist from './isCategoryExist';

export interface Response {
  genre: string;
  playlists: Spotify.Playlist[];
}

const searchPlayListsByTopTrackArtist: Fetcher<Response> = async apiClient => {
  const { data: artists } = await getUserTop(apiClient, Type.ARTIST);
  const _artist = artists.items[0];
  const genres = await Promise.all(
    _artist.genres.map(genre => isCategoryExist(apiClient, genre)),
  );
  const {
    data: { categoryId },
  } = genres.filter(response => response.data.isCategoryExist)[0];
  const searchResponse = await getCategoryPlayList(apiClient, categoryId);
  const {
    data: {
      playlists: { items: _playlists },
    },
  } = searchResponse;
  return Object.assign(searchResponse, {
    data: {
      genre: categoryId,
      playlists: _playlists,
    },
  });
};

export default searchPlayListsByTopTrackArtist;
