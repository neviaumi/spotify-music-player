import getRecentlyPlayed from '../player/getRecentlyPlayed';
import searchPlayLists from '../search/searchPlayLists';
import { Fetcher } from '../typings/fetcher';

export interface Response {
  playlists: Spotify.Playlist[];
  track: Spotify.Track;
}

const searchPlayListByLastPlayedTrack: Fetcher<Response> = async apiClient => {
  const {
    data: { items: tracks },
  } = await getRecentlyPlayed(apiClient);
  const track = tracks[0].track;
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

export default searchPlayListByLastPlayedTrack;
