import getUserTop, { Type } from '../personalization/getUserTop';
import searchPlayLists from '../search/searchPlayLists';
import { Fetcher } from '../typings/fetcher';

export interface Response {
  artist: Spotify.Artist;
  playlists: Spotify.Playlist[];
}

const searchPlayListsByTopTrackArtist: Fetcher<Response> = async apiClient => {
  const { data: tracks } = await getUserTop(apiClient, Type.TRACK);
  const _artist = tracks.items[0].artists[0];
  const query: string = `"${_artist.name}"`;
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

export default searchPlayListsByTopTrackArtist;
