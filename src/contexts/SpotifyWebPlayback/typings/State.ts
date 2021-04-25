import type { AxiosInstance } from 'axios';

import type { ActivePlaybackState, PlaybackState } from './Playback';

interface LifecycleEvent {
  from: PlaybackState;
  to: PlaybackState;
  transition: string;
}

export interface StateMachine {
  can: (newState: PlaybackState) => boolean;
  getPlayback: (options: {
    apiClient: AxiosInstance;
    localPlayback?: Spotify.SpotifyPlayer;
  }) => ActivePlaybackState;
  idle: () => void;
  is: (currentState: PlaybackState) => boolean;
  observe: (
    observeEvents: 'onEnterState',
    callback: (event: LifecycleEvent) => void,
  ) => void;
  playOnLocalPlayback: () => void;
  playOnRemotePlayback: () => void;
  state: PlaybackState;
}

export type StateMachineOptions = {
  init: PlaybackState;
  methods: {
    getPlayback: (
      this: StateMachine,
      options: {
        apiClient: AxiosInstance;
        localPlayback?: Spotify.SpotifyPlayer;
      },
    ) => ActivePlaybackState;
  };
  transitions: {
    from: PlaybackState | '*' | PlaybackState[];
    name: string;
    to: PlaybackState;
  }[];
};
