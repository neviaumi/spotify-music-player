import { eqBy, prop, uniqWith } from 'ramda';

import type { TrackFull } from '../typings/Track';
import { useGetSeveralTracks } from './useGetSeveralTracks';
import {
  Period,
  useTopStreamingTracksReport,
} from './useTopStreamingTracksReport';

export function useTopStreamingAlbum() {
  const topTracks = useTopStreamingTracksReport({
    period: Period.Weekly,
    region: 'hk',
  });
  const trackIds = topTracks?.data.data.items
    .map(({ trackId }: { trackId: string }) => trackId)
    .slice(0, 50);
  const tracks = useGetSeveralTracks(trackIds);
  if (!tracks) return undefined;

  const albums = uniqWith(
    // @ts-expect-error error come from ramda internal type
    eqBy(prop('id')),
    tracks.data.tracks.map((track: TrackFull) => {
      return track.album;
    }),
  );
  return {
    data: {
      albums,
    },
  };
}
