import getUserTop, { Type } from '../personalization/getUserTop';
import searchPlayLists from '../search/searchPlayLists';
import type { Fetcher } from '../typings/fetcher';

export interface Response {
  playlists: Spotify.Playlist[];
  track: Spotify.Track;
}

const searchPlayListsByTopTrack: Fetcher<Response> = async apiClient => {
  const { data: tracks } = await getUserTop(apiClient, Type.TRACK);
  const track = tracks.items[0];
  const query = `"${track.name}"`;
  const searchResponse = await searchPlayLists(apiClient, query);
  const {
    data: {
      playlists: { items: _playlists },
    },
  } = searchResponse;
  return Object.assign(searchResponse, {
    data: {
      track: track as Spotify.Track,
      playlists: _playlists,
    },
  });
};

export default searchPlayListsByTopTrack;
