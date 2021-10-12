import { eqBy, prop, uniqWith } from 'ramda';

import type { AlbumSimplified } from '../typings/Album';
import type { QueryResponse } from '../typings/QueryResponse';
import type { TrackFull } from '../typings/Track';
import { SeedType, useRecommendations } from './useRecommendations';
import { QueryType, useUserTop } from './useUserTop';

interface Response {
  albums: AlbumSimplified[];
  tracks: TrackFull[];
}

export function useSuggestedAlbumByUserTopTracks(): QueryResponse<Response> {
  const userTop = useUserTop(QueryType.TRACK);
  const topTracks = userTop?.data?.items ?? [];
  const recommendations = useRecommendations(
    topTracks.map(track => track.id),
    SeedType.SeedTracks,
  );

  if (!recommendations) return undefined;
  const {
    data: { tracks: recommendTracks },
  } = recommendations;

  const albums = uniqWith<AlbumSimplified, void>(
    // @ts-expect-error error come from ramda internal type
    eqBy(prop('id')),
    recommendTracks.map(track => track.album),
  );
  return {
    data: {
      albums: albums,
      tracks: topTracks.slice(0, 5),
    },
  };
}
