import './SpotifyPlayer.d';

import constate from 'constate';
import { useCallback, useState } from 'react';
import { useGetUsersCurrentlyPlayingTrack } from 'src/hooks/spotify/query/useGetUsersCurrentlyPlayingTrack';
import type { TrackSimplified } from 'src/hooks/spotify/typings/Track';

import { useSpotifyAPIClient } from '../../hooks/useSpotifyAPIClient';
import { PlayerState, useSpotifyPlayer } from './useSpotifyPlayer';

export interface SpotifyWebPlaybackProps {
  currentState?: PlayerState;
  currentTrack?: Spotify.Track;
  player?: Spotify.SpotifyPlayer;
}

function useCreateSpotifyWebPlayback({
  currentTrack,
  player: preConstructedPlayerInstance,
  currentState,
}: SpotifyWebPlaybackProps) {
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<
    { item: Spotify.Track; progress_ms: number; timestamp: number } | undefined
  >(
    currentTrack
      ? { item: currentTrack, progress_ms: 0, timestamp: Date.now() }
      : undefined,
  );
  const apiClient = useSpotifyAPIClient();

  const {
    playerConnectState,
    transitPlayerConnectState,
    playerError,
    player,
  } = useSpotifyPlayer({
    currentState,
    onPlayStateChange: function playStateChange(
      state: null | Spotify.PlaybackState,
    ) {
      if (!state) {
        // playback control may be taken from other device.
        transitPlayerConnectState(PlayerState.CONNECTED);
        return;
      }
      const {
        position,
        track_window: { current_track },
        paused,
      } = state;
      transitPlayerConnectState(
        paused ? PlayerState.PAUSED : PlayerState.PLAYING,
      );
      setCurrentPlayingTrack({
        item: current_track,
        progress_ms: position,
        timestamp: Date.now(),
      });
    },
    player: preConstructedPlayerInstance,
  });

  const {
    data: currentPlayingTrackFromAPI,
    error: fetchCurrentPlayingTrackError,
  } = useGetUsersCurrentlyPlayingTrack(
    playerConnectState === PlayerState.CONNECTED,
    {
      refreshInterval: 10000,
      suspense: false,
    },
  );
  if (
    playerConnectState === PlayerState.CONNECTED &&
    currentPlayingTrackFromAPI
  ) {
    const shouldUpdateCurrentTrack =
      currentPlayingTrackFromAPI.item.uri !== currentPlayingTrack?.item.uri ||
      currentPlayingTrackFromAPI.progress_ms >
        (currentPlayingTrack?.progress_ms ?? 0);
    if (shouldUpdateCurrentTrack) {
      setCurrentPlayingTrack(currentPlayingTrackFromAPI);
    }
  }
  const startPlayTrackOnUserPlayback = useCallback(
    async (trackUri: string) => {
      if (playerConnectState === PlayerState.DISCONNECTED) return;
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
    [playerConnectState, player, apiClient],
  );
  const pauseUserPlayback = useCallback(async () => {
    if (playerConnectState === PlayerState.DISCONNECTED) return;
    const { id: device_id } = player!._options;
    await apiClient.request({
      method: 'put',
      params: {
        device_id,
      },
      url: 'me/player/pause',
    });
  }, [playerConnectState, player, apiClient]);

  return {
    currentPlayingTrack,
    error: playerError || fetchCurrentPlayingTrackError,
    pauseUserPlayback,
    playTrackOnUserPlayback: (track: TrackSimplified) =>
      startPlayTrackOnUserPlayback(track.uri),
    playerConnectState,
  };
}

const [SpotifyWebPlaybackProvider, useSpotifyWebPlayback] = constate(
  useCreateSpotifyWebPlayback,
);

export { PlayerState, SpotifyWebPlaybackProvider, useSpotifyWebPlayback };
