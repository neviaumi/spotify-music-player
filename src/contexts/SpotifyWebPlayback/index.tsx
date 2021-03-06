import type { AxiosRequestConfig } from 'axios';
import constate from 'constate';
import { useCallback, useState } from 'react';
import type { TrackSimplified } from 'src/hooks/spotify/typings/Track';
import useSWR from 'swr';

import { useSpotifyAPIClient } from '../../hooks/useSpotifyAPIClient';
import { useLocalSpotifyPlayback } from './hooks/useLocalSpotifyPlayback';
import { usePlaybackStateMachine } from './hooks/usePlaybackStateMachine';
import { PlaybackState } from './states/PlaybackState';
import type { RepeatMode } from './states/RepeatMode';

function useCreateSpotifyWebPlayback() {
  const playbackStateMachine = usePlaybackStateMachine(PlaybackState.INIT);

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
    mutate: mutateCurrentPlaybackState,
  } = useSWR(
    [playback.playbackType, 'getPlaybackState'],
    () => {
      return playback.getPlaybackState();
    },
    {
      refreshInterval: playback.refreshInterval,
      suspense: false,
    },
  );
  const playOnDeviceId = currentPlaybackState?.is_active
    ? currentPlaybackState?.device.id
    : player?._options.id;
  const isLocalDeviceId =
    player?._options.id && playOnDeviceId === player?._options.id;

  const controlPlaybackByAPI = useCallback(
    async (config: AxiosRequestConfig) => {
      if (!playOnDeviceId) return;
      if (isLoading) return; // disable concurrent send command to player
      setIsLoading(isLoading);
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
      else await mutateCurrentPlaybackState();
      setIsLoading(false);
    },
    [
      playOnDeviceId,
      isLoading,
      apiClient,
      isLocalDeviceId,
      playbackStateMachine,
      mutateCurrentPlaybackState,
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
  const playPreviousTrack = useCallback(async () => {
    await controlPlaybackByAPI({
      method: 'POST',
      url: 'me/player/previous',
    });
  }, [controlPlaybackByAPI]);
  const togglePlayMode = useCallback(async () => {
    if (!currentPlaybackState) return;
    const { is_paused, is_active, track } = currentPlaybackState;
    if (!is_active) {
      if (track.disc_number) {
        await controlPlaybackByAPI({
          data: {
            context_uri: track.album.uri,
            offset: {
              position: track.disc_number,
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

  return {
    data: {
      changeRepeatMode,
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
      togglePlayMode,
      toggleShuffleMode,
    },
    error: playerError || getPlaybackStateError,
    isLoading,
  };
}

const [SpotifyWebPlaybackProvider, useSpotifyWebPlayback] = constate(
  useCreateSpotifyWebPlayback,
);

export { PlaybackState, SpotifyWebPlaybackProvider, useSpotifyWebPlayback };
