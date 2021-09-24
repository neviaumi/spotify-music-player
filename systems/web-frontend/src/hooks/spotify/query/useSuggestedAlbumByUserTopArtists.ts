import type { AxiosResponse } from 'axios';
import { eqBy, prop, uniqWith } from 'ramda';

import type { AlbumSimplified } from '../typings/Album';
import type { ArtistFull } from '../typings/Artist';
import { SeedType, useRecommendations } from './useRecommendations';
import { QueryType, useUserTop } from './useUserTop';

interface Response {
  albums: AlbumSimplified[];
  artists: ArtistFull[];
}

export function useSuggestedAlbumByUserTopArtists():
  | AxiosResponse<Response>
  | undefined {
  const userTop = useUserTop(QueryType.ARTIST);
  const topArtists = userTop?.data?.items ?? [];
  const recommendations = useRecommendations(
    topArtists.map(artist => artist.id),
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
    ...recommendations,
    data: {
      albums: albums,
      artists: topArtists.slice(0, 5),
    },
  };
}
