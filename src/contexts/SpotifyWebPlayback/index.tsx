import constate from 'constate';
import { useState } from 'react';
import type { TrackSimplified } from 'src/hooks/spotify/typings/Track';

export interface SpotifyWebPlaybackProps {
  currentTrack?: TrackSimplified;
}

function _useSpotifyWebPlayback({ currentTrack }: SpotifyWebPlaybackProps) {
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<
    TrackSimplified | undefined
  >(currentTrack);
  function playTrack(track: TrackSimplified) {
    setCurrentPlayingTrack(track);
  }
  function pausePlayer() {
    setCurrentPlayingTrack(undefined);
  }
  return {
    currentPlayingTrack,
    isPlaybackReady: currentPlayingTrack !== undefined,
    pausePlayer,
    playTrack,
  };
}

const [SpotifyWebPlaybackProvider, useSpotifyWebPlayback] = constate(
  _useSpotifyWebPlayback,
);

export { SpotifyWebPlaybackProvider, useSpotifyWebPlayback };
