import './SpotifyPlayer.d';

import constate from 'constate';
import { useCallback, useState } from 'react';
import type { TrackSimplified } from 'src/hooks/spotify/typings/Track';

import { useSpotifyAPIClient } from '../../hooks/useSpotifyAPIClient';
import { useSpotifyPlayer } from './useSpotifyPlayer';

export interface SpotifyWebPlaybackProps {
  currentTrack?: Spotify.Track;
  player?: Spotify.SpotifyPlayer;
}

function useCreateSpotifyWebPlayback({
  currentTrack,
  player: preConstructedPlayerInstance,
}: SpotifyWebPlaybackProps) {
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<
    Spotify.Track | undefined
  >(currentTrack);
  const apiClient = useSpotifyAPIClient();
  const playbackStateChange = useCallback(
    (state: null | Spotify.PlaybackState) => {
      if (!state) {
        // playback control may be taken from other device.
        setCurrentPlayingTrack(undefined); // should not set to undefined actually
        return;
      }
      const {
        track_window: { current_track },
        paused,
      } = state;
      setCurrentPlayingTrack(paused ? undefined : current_track); // @TODO: separate paused track handle
    },
    [],
  );
  const { isPlayerReady, player } = useSpotifyPlayer({
    onPlayStateChange: playbackStateChange,
    player: preConstructedPlayerInstance,
  });
  const startPlayTrackOnUserPlayback = useCallback(
    async (trackUri: string) => {
      if (!isPlayerReady) return;
      const { id: device_id } = player!._options;
      await apiClient.request({
        data: {
          uris: [trackUri],
        },
        method: 'put',
        params: {
          device_id,
        },
        url: 'me/player/play',
      });
    },
    [isPlayerReady, player, apiClient],
  );
  const pauseUserPlayback = useCallback(async () => {
    if (!isPlayerReady) return;
    const { id: device_id } = player!._options;
    await apiClient.request({
      method: 'put',
      params: {
        device_id,
      },
      url: 'me/player/pause',
    });
  }, [isPlayerReady, player, apiClient]);

  return {
    currentPlayingTrack,
    isPlaybackReady: isPlayerReady,
    pauseUserPlayback,
    playTrackOnUserPlayback: (track: TrackSimplified) =>
      startPlayTrackOnUserPlayback(track.uri),
  };
}

const [SpotifyWebPlaybackProvider, useSpotifyWebPlayback] = constate(
  useCreateSpotifyWebPlayback,
);

export { SpotifyWebPlaybackProvider, useSpotifyWebPlayback };
