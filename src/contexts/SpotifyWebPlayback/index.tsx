import constate from 'constate';
import { useState } from 'react';
import type { TrackSimplified } from 'src/hooks/spotify/typings/Track';

function _useSpotifyWebPlayback() {
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<
    TrackSimplified | undefined
  >(undefined);
  function playTrack(track: TrackSimplified) {
    setCurrentPlayingTrack(track);
  }
  return {
    currentPlayingTrack,
    isPlaybackReady: currentPlayingTrack !== undefined,
    playTrack,
  };
}

const [SpotifyWebPlaybackProvider, useSpotifyWebPlayback] = constate(
  _useSpotifyWebPlayback,
);

export { SpotifyWebPlaybackProvider, useSpotifyWebPlayback };
