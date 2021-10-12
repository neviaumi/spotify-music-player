import { eqBy, prop, uniqWith } from 'ramda';

import type { AlbumSimplified } from '../typings/Album';
import type { ArtistSimplified } from '../typings/Artist';
import type { QueryResponse } from '../typings/QueryResponse';
import { useRecentPlayedTrack } from './useRecentPlayedTrack';
import { SeedType, useRecommendations } from './useRecommendations';

interface Response {
  albums: AlbumSimplified[];
  artists: ArtistSimplified[];
}

export function useSuggestedAlbumByUserLastPlayedArtists(): QueryResponse<Response> {
  const recentPlayedTrack = useRecentPlayedTrack();
  const recentPlayedTrackArtists = uniqWith<ArtistSimplified, void>(
    // @ts-expect-error error come from ramda internal type
    eqBy(prop('id')),
    recentPlayedTrack?.data.items.map(item => item.track.artists).flat() ?? [],
  );

  const recommendations = useRecommendations(
    recentPlayedTrackArtists.map(artist => artist.id),
    SeedType.SeedArtists,
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
      albums,
      artists: recentPlayedTrackArtists.slice(0, 5),
    },
  };
}
