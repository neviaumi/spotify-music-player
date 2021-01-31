import type { AxiosResponse } from 'axios';
import { eqBy, prop, uniqWith } from 'ramda';

import type { AlbumSimplified } from '../typings/Album';
import type { TrackFull } from '../typings/Track';
import { useGetSeveralTracks } from './useGetSeveralTracks';
import {
  Period,
  useTopStreamingTracksReport,
} from './useTopStreamingTracksReport';

interface Response {
  albums: AlbumSimplified[];
  trackIds: string[];
}

export function useTopStreamingAlbum(): AxiosResponse<Response> | undefined {
  const topTracks = useTopStreamingTracksReport({
    period: Period.Weekly,
    region: 'hk',
  });
  const trackIds = topTracks?.data.data.items
    .map(({ trackId }: { trackId: string }) => trackId)
    .slice(0, 50);
  const tracks = useGetSeveralTracks(trackIds);
  if (!tracks) return undefined;

  const albums = uniqWith<AlbumSimplified, void>(
    // @ts-expect-error error come from ramda internal type
    eqBy(prop('id')),
    tracks.data.tracks.map((track: TrackFull) => {
      return track.album;
    }),
  );
  return {
    ...tracks,
    data: {
      albums,
      trackIds,
    },
  };
}
