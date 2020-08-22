import getUserTop, { Type } from '../personalization/getUserTop';
import searchPlayLists from '../search/searchPlayLists';
import type { Fetcher } from '../typings/fetcher';

export interface Response {
  artist: Spotify.Artist;
  playlists: Spotify.Playlist[];
}

const searchPlayListsByTopArtist: Fetcher<Response> = async apiClient => {
  const { data: artists } = await getUserTop(apiClient, Type.ARTIST);
  const _artist = artists.items[0];
  const query = `"${_artist.name}"`;
  const searchResponse = await searchPlayLists(apiClient, query);
  const {
    data: {
      playlists: { items: _playlists },
    },
  } = searchResponse;
  return Object.assign(searchResponse, {
    data: {
      artist: _artist as Spotify.Artist,
      playlists: _playlists,
    },
  });
};

export default searchPlayListsByTopArtist;
