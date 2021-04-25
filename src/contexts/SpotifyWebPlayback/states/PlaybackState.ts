// @ts-expect-error https://github.com/jakesgordon/javascript-state-machine/issues/91
import JSStateMachine from 'javascript-state-machine';

import { PlaybackState } from '../typings/Playback';
import type { StateMachine, StateMachineOptions } from '../typings/State';
import { IdlePlaybackState } from './IdlePlaybackState';
import { LocalPlaybackState } from './LocalPlaybackState';
import { RemotePlaybackState } from './RemotePlaybackState';

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
            apiClient,
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
