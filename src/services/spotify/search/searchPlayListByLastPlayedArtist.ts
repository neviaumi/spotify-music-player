import getRecentlyPlayed from '../player/getRecentlyPlayed';
import searchPlayLists from '../search/searchPlayLists';
import { Fetcher } from '../typings/fetcher';

export interface Response {
  artist: Spotify.Artist;
  playlists: Spotify.Playlist[];
}

const searchPlayListByLastPlayedArtist: Fetcher<Response> = async apiClient => {
  const {
    data: { items: tracks },
  } = await getRecentlyPlayed(apiClient);
  const track = tracks[0].track;
  const query = `"${track.artists[0].name}"`;
  const searchResponse = await searchPlayLists(apiClient, query);
  const {
    data: {
      playlists: { items: _playlists },
    },
  } = searchResponse;
  return Object.assign(searchResponse, {
    data: {
      artist: track.artists[0] as Spotify.Artist,
      playlists: _playlists,
    },
  });
};

export default searchPlayListByLastPlayedArtist;
