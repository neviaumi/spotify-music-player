import { useMemo, useState } from 'react';

import { createPlaybackStateMachine } from '../states/PlaybackState';
import type { PlaybackState } from '../typings/Playback';
import type { StateMachine } from '../typings/State';

export function usePlaybackStateMachine(initialState: PlaybackState) {
  const [, setPlaybackState] = useState<PlaybackState>();

  const fsm = useMemo<StateMachine>(() => {
    const stateMachine = createPlaybackStateMachine(initialState);
    stateMachine.observe('onEnterState', ({ to }) => setPlaybackState(to));
    return stateMachine;
  }, [initialState]);

  return fsm;
}
