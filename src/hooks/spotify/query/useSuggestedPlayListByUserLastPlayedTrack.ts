import type { AxiosResponse } from 'axios';

import type { PlaylistSimplified } from '../typings/Playlist';
import type { TrackSimplified } from '../typings/Track';
import { useRecentPlayedTrack } from './useRecentPlayedTrack';
import { useSearchPlayList } from './useSearchPlayList';

interface Response {
  playlists: PlaylistSimplified[];
  track: TrackSimplified;
}

export function useSuggestedPlayListByUserLastPlayedTrack():
  | AxiosResponse<Response>
  | undefined {
  const recentPlayedTrack = useRecentPlayedTrack();
  const lastPlayedTrack = recentPlayedTrack?.data?.items[0].track;
  const query = lastPlayedTrack ? `"${lastPlayedTrack.name}"` : undefined;
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
      playlists: items,
      track: lastPlayedTrack,
    },
  };
}
