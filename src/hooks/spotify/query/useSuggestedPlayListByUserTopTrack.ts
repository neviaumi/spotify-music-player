import type { AxiosResponse } from 'axios';

import type { PlaylistSimplified } from '../typings/Playlist';
import type { TrackFull } from '../typings/Track';
import useSearchPlayList from './useSearchPlayList';
import useUserTop, { QueryType } from './useUserTop';

interface Response {
  playlists: PlaylistSimplified[];
  track: TrackFull;
}

export default function useSuggestedPlayListByUserTopTrack():
  | AxiosResponse<Response>
  | undefined {
  const userTop = useUserTop(QueryType.TRACK);
  const topTrack = userTop?.data?.items[0];
  const query = topTrack ? `"${topTrack.name}"` : undefined;
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
      track: topTrack,
    },
  };
}
