import { eqBy, prop, uniqWith } from 'ramda';

import type { AlbumSimplified } from '../typings/Album';
import type { QueryResponse } from '../typings/QueryResponse';
import type { TrackSimplified } from '../typings/Track';
import { useRecentPlayedTrack } from './useRecentPlayedTrack';
import { SeedType, useRecommendations } from './useRecommendations';

interface Response {
  albums: AlbumSimplified[];
  tracks: TrackSimplified[];
}

export function useSuggestedAlbumByUserLastPlayedTracks(): QueryResponse<Response> {
  const recentPlayedTrack = useRecentPlayedTrack();
  const recommendations = useRecommendations(
    recentPlayedTrack?.data.items.map(item => item.track.id) ?? [],
    SeedType.SeedTracks,
  );
  if (!recommendations || !recentPlayedTrack) return undefined;
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
      tracks: recentPlayedTrack.data.items.map(item => item.track).slice(0, 5),
    },
  };
}
