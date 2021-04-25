import type { AxiosRequestConfig } from 'axios';
import constate from 'constate';
import { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import type { TrackSimplified } from 'src/hooks/spotify/typings/Track';

import { useSpotifyAPIClient } from '../../hooks/useSpotifyAPIClient';
import { useLocalSpotifyPlayback } from './hooks/useLocalSpotifyPlayback';
import { usePlaybackStateMachine } from './hooks/usePlaybackStateMachine';
import type { RepeatMode } from './states/RepeatMode';
import { PlaybackState, PlaybackType } from './typings/Playback';

function useCreateSpotifyWebPlayback() {
  const playbackStateMachine = usePlaybackStateMachine(PlaybackState.INIT);

  const queryClient = useQueryClient();
  const apiClient = useSpotifyAPIClient();

  const { playerError, player } = useLocalSpotifyPlayback({
    onPlayerStateChanged: useCallback(
      state => {
        if (!state) {
          if (playbackStateMachine.can(PlaybackState.PLAY_ON_REMOTE_PLAYBACK))
            playbackStateMachine.playOnRemotePlayback();
        } else {
          if (playbackStateMachine.can(PlaybackState.PLAY_ON_LOCAL_PLAYBACK))
            playbackStateMachine.playOnLocalPlayback();
        }
      },
      [playbackStateMachine],
    ),
  });

  const [isLoading, setIsLoading] = useState(false);

  const playback = playbackStateMachine.getPlayback({
    apiClient,
    localPlayback: player,
  });
  const {
    data: currentPlaybackState,
    error: getPlaybackStateError,
    refetch,
  } = useQuery(
    [playback.playbackType, playbackStateMachine.state, 'getPlaybackState'],
    () => {
      return playback.getPlaybackState();
    },
    {
      refetchInterval: playback.refreshInterval,
      suspense: false,
    },
  );
  const invalidCurrentPlaybackState = useCallback(async () => {
    await queryClient.invalidateQueries([
      playback.playbackType,
      playbackStateMachine.state,
      'getPlaybackState',
    ]);
    await refetch();
  }, [playback.playbackType, playbackStateMachine.state, queryClient, refetch]);
  const localPlaybackId = player?._options.id;
  const playOnDeviceId = currentPlaybackState?.is_active
    ? currentPlaybackState?.device.id
    : localPlaybackId;
  const isLocalDeviceId =
    player?._options.id && playOnDeviceId === player?._options.id;

  const controlPlaybackByAPI = useCallback(
    async (config: AxiosRequestConfig) => {
      if (!playOnDeviceId) return;
      if (isLoading) return; // disable concurrent send command to player
      setIsLoading(true);
      await apiClient.request({
        ...config,
        params: {
          ...config.params,
          device_id: playOnDeviceId,
        },
      });
      if (
        isLocalDeviceId &&
        playbackStateMachine.can(PlaybackState.PLAY_ON_LOCAL_PLAYBACK)
      )
        playbackStateMachine.playOnLocalPlayback();
      else await invalidCurrentPlaybackState();
      setIsLoading(false);
    },
    [
      playOnDeviceId,
      isLoading,
      apiClient,
      isLocalDeviceId,
      playbackStateMachine,
      invalidCurrentPlaybackState,
    ],
  );

  const startPlayTrackOnUserPlayback = useCallback(
    async (trackUri: string) => {
      await controlPlaybackByAPI({
        data: {
          uris: [trackUri],
        },
        method: 'put',
        url: 'me/player/play',
      });
    },
    [controlPlaybackByAPI],
  );
  const pauseUserPlayback = useCallback(async () => {
    await controlPlaybackByAPI({
      method: 'put',
      url: 'me/player/pause',
    });
  }, [controlPlaybackByAPI]);

  const playNextTrack = useCallback(async () => {
    await controlPlaybackByAPI({
      method: 'POST',
      url: 'me/player/next',
    });
  }, [controlPlaybackByAPI]);

  const seekTrack = useCallback(
    async (position_ms: number) => {
      await controlPlaybackByAPI({
        method: 'PUT',
        params: {
          position_ms,
        },
        url: 'me/player/seek',
      });
    },
    [controlPlaybackByAPI],
  );
  const playPreviousTrack = useCallback(async () => {
    if (currentPlaybackState) {
      const { progress_ms } = currentPlaybackState;
      if (progress_ms >= 1000) return seekTrack(0);
    }
    return controlPlaybackByAPI({
      method: 'POST',
      url: 'me/player/previous',
    });
  }, [controlPlaybackByAPI, currentPlaybackState, seekTrack]);
  const togglePlayMode = useCallback(async () => {
    if (!currentPlaybackState) return;
    const { is_paused, is_active, track } = currentPlaybackState;
    if (!is_active) {
      if (track.track_number) {
        await controlPlaybackByAPI({
          data: {
            context_uri: track.album.uri,
            offset: {
              position: track.track_number - 1,
            },
          },
          method: 'put',
          url: 'me/player/play',
        });
      } else {
        await controlPlaybackByAPI({
          data: {
            uris: [track.uri],
          },
          method: 'put',
          url: 'me/player/play',
        });
      }
      return;
    }
    if (is_paused) {
      await controlPlaybackByAPI({
        method: 'put',
        url: 'me/player/play',
      });
    } else {
      await controlPlaybackByAPI({
        method: 'put',
        url: 'me/player/pause',
      });
    }
  }, [currentPlaybackState, controlPlaybackByAPI]);
  const toggleShuffleMode = useCallback(async () => {
    if (!currentPlaybackState) return;
    await controlPlaybackByAPI({
      method: 'PUT',
      params: {
        state: !currentPlaybackState.shuffle_state,
      },
      url: 'me/player/shuffle',
    });
  }, [controlPlaybackByAPI, currentPlaybackState]);
  const changeRepeatMode = useCallback(
    async (newMode: RepeatMode) => {
      await controlPlaybackByAPI({
        method: 'PUT',
        params: {
          state: newMode,
        },
        url: 'me/player/repeat',
      });
    },
    [controlPlaybackByAPI],
  );

  const setVolume = useCallback(
    (volume: number) =>
      controlPlaybackByAPI({
        method: 'PUT',
        params: {
          volume_percent: Math.floor(volume),
        },
        url: 'me/player/volume',
      }),
    [controlPlaybackByAPI],
  );

  const transferPlayback = useCallback(
    async (targetPlaybackDeviceId: string) => {
      if (!playOnDeviceId) return;
      if (isLoading) return; // disable concurrent send command to player
      setIsLoading(true);
      await apiClient.request({
        data: {
          device_ids: [targetPlaybackDeviceId],
          play: true,
        },
        method: 'PUT',
        url: 'me/player',
      });
      setIsLoading(false);
      if (
        targetPlaybackDeviceId === localPlaybackId &&
        playbackStateMachine.can(PlaybackState.PLAY_ON_LOCAL_PLAYBACK)
      )
        playbackStateMachine.playOnLocalPlayback();
      else if (playbackStateMachine.can(PlaybackState.PLAY_ON_REMOTE_PLAYBACK))
        playbackStateMachine.playOnRemotePlayback();
    },
    [
      apiClient,
      isLoading,
      localPlaybackId,
      playOnDeviceId,
      playbackStateMachine,
    ],
  );

  return {
    data: {
      changeRepeatMode,
      currentPlaybackDevice: currentPlaybackState?.device,
      currentPlayingTrack: currentPlaybackState?.track,
      isActive: currentPlaybackState?.is_active ?? false,
      isPaused: currentPlaybackState?.is_paused,
      pauseUserPlayback,
      playNextTrack,
      playPreviousTrack,
      playTrackOnUserPlayback: (track: TrackSimplified) =>
        startPlayTrackOnUserPlayback(track.uri),
      playbackDisallowedActions: currentPlaybackState?.actions.disallows,
      playbackEnabledShuffle: currentPlaybackState?.shuffle_state,
      playbackRepeatMode: currentPlaybackState?.repeat_state,
      playbackState: playbackStateMachine.state,
      playbackType: playback.playbackType,
      progressMS: currentPlaybackState?.progress_ms,
      seekTrack,
      setVolume,
      togglePlayMode,
      toggleShuffleMode,
      transferPlayback,
      volumePercent: currentPlaybackState?.device.volume_percent,
    },
    error: playerError || getPlaybackStateError,
    isLoading,
  };
}

const [SpotifyWebPlaybackProvider, useSpotifyWebPlayback] = constate(
  useCreateSpotifyWebPlayback,
);

export {
  PlaybackState,
  PlaybackType,
  SpotifyWebPlaybackProvider,
  useSpotifyWebPlayback,
};
