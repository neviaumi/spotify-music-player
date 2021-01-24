import type { AxiosResponse } from 'axios';

import type { ArtistSimplified } from '../typings/Artist';
import type { PlaylistSimplified } from '../typings/Playlist';
import useRecentPlayedTrack from './useRecentPlayedTrack';
import useSearchPlayList from './useSearchPlayList';

interface Response {
  artist: ArtistSimplified;
  playlists: PlaylistSimplified[];
}

export default function useSuggestedPlayListByLastPlayedArtist():
  | AxiosResponse<Response>
  | undefined {
  const recentPlayedTrack = useRecentPlayedTrack();
  const lastPlayedTrackArtist =
    recentPlayedTrack?.data?.items[0].track.artists[0];
  const query = lastPlayedTrackArtist
    ? `"${lastPlayedTrackArtist.name}"`
    : undefined;
  const searchResponse = useSearchPlayList(query);
  if (!searchResponse) return undefined;
  const {
    data: {
      playlists: { items },
    },
  } = searchResponse;
  return {
    ...searchResponse,
    data: {
      artist: lastPlayedTrackArtist,
      playlists: items,
    },
  };
}
