import { eqBy, prop, uniqWith } from 'ramda';

import type { AlbumSimplified } from '../typings/Album';
import type { QueryResponse } from '../typings/QueryResponse';
import { SeedType, useRecommendations } from './useRecommendations';
import { QueryType, useUserTop } from './useUserTop';

interface Response {
  albums: AlbumSimplified[];
  genres: string[];
}

export function useSuggestedAlbumByUserTopArtistGenres(): QueryResponse<Response> {
  const userTop = useUserTop(QueryType.ARTIST);
  const topArtistGenres = Object.entries(
    userTop?.data?.items
      .map(artist => artist.genres)
      .flat()
      .reduce<{
        [key: string]: number;
      }>(
        (acc, current) =>
          Object.assign(acc, {
            [current]: (acc[current] ?? 0) + 1,
          }),
        {},
      ) ?? {},
  ).sort(([, genreCountA], [, genreCountB]) => genreCountB - genreCountA);
  const recommendations = useRecommendations(
    topArtistGenres.map(([genre]) => genre),
    SeedType.SeedGenres,
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
      genres: topArtistGenres.map(([genre]) => genre).slice(0, 5),
    },
  };
}
