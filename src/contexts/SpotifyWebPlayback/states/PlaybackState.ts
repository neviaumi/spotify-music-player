import type { AxiosInstance } from 'axios';
// @ts-expect-error https://github.com/jakesgordon/javascript-state-machine/issues/91
import JSStateMachine from 'javascript-state-machine';

import { IdlePlaybackState } from './IdlePlaybackState';
import { LocalPlaybackState } from './LocalPlaybackState';
import { RemotePlaybackState } from './RemotePlaybackState';
import type { RepeatMode } from './RepeatMode';

export enum PlaybackState {
  IDLE = 'idle', // No playback taking control
  INIT = 'init', // default state
  PLAY_ON_LOCAL_PLAYBACK = 'playOnLocalPlayback', // track playing on local playback
  PLAY_ON_REMOTE_PLAYBACK = 'playOnRemotePlayback', // track playing on remote playback
}

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

export function createPlaybackStateMachine(
  initialState: PlaybackState,
): StateMachine {
  const initializationStates: StateMachineOptions = {
    init: initialState,
    methods: {
      getPlayback({ apiClient, localPlayback }) {
        const { state } = this;
        if (state === PlaybackState.PLAY_ON_LOCAL_PLAYBACK && localPlayback) {
          return new LocalPlaybackState({
            localPlayback,
            stateMachine: this,
          });
        }
        if (state === PlaybackState.IDLE) {
          return new IdlePlaybackState({
            apiClient,
            localPlayback,
            stateMachine: this,
          });
        }

        return new RemotePlaybackState({
          apiClient,
          localPlayback,
          stateMachine: this,
        });
      },
    },
    transitions: [
      {
        from: '*',
        name: PlaybackState.IDLE,
        to: PlaybackState.IDLE,
      },
      {
        from: [
          PlaybackState.PLAY_ON_REMOTE_PLAYBACK,
          PlaybackState.IDLE,
          PlaybackState.INIT,
        ],
        name: PlaybackState.PLAY_ON_LOCAL_PLAYBACK,
        to: PlaybackState.PLAY_ON_LOCAL_PLAYBACK,
      },
      {
        from: [
          PlaybackState.PLAY_ON_LOCAL_PLAYBACK,
          PlaybackState.IDLE,
          PlaybackState.INIT,
        ],
        name: PlaybackState.PLAY_ON_REMOTE_PLAYBACK,
        to: PlaybackState.PLAY_ON_REMOTE_PLAYBACK,
      },
    ],
  };
  return new JSStateMachine(initializationStates);
}

export enum PlaybackType {
  Local = 'local',
  Remote = 'remote',
}

export interface PlaybackDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}

export interface ActivePlaybackState {
  readonly playbackType: PlaybackType;
  readonly refreshInterval: number;
  readonly stateMachine: StateMachine;
  // eslint-disable-next-line typescript-sort-keys/interface
  getPlaybackState(): Promise<null | {
    actions: {
      disallows: Spotify.PlaybackDisallows;
    };
    device: PlaybackDevice;
    is_active: boolean;
    is_paused: boolean;
    progress_ms: number;
    repeat_state: RepeatMode;
    shuffle_state: boolean;
    track: Spotify.Track;
  }>;
}
