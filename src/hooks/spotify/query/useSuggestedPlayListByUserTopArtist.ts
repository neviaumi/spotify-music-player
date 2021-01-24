import type { AxiosResponse } from 'axios';

import type { ArtistFull } from '../typings/Artist';
import type { PlaylistSimplified } from '../typings/Playlist';
import useSearchPlayList from './useSearchPlayList';
import useUserTop, { QueryType } from './useUserTop';

interface Response {
  artist: ArtistFull;
  playlists: PlaylistSimplified[];
}

export default function useSuggestedPlayListByUserTopArtist():
  | AxiosResponse<Response>
  | undefined {
  const userTop = useUserTop(QueryType.ARTIST);
  const topArtist = userTop?.data?.items[0];
  const query = topArtist ? `"${topArtist.name}"` : undefined;
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
      artist: topArtist,
      playlists: items,
    },
  };
}
