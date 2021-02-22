import { useMemo, useState } from 'react';

import {
  createPlaybackStateMachine,
  PlaybackState,
  StateMachine,
} from '../states/PlaybackState';

export function usePlaybackStateMachine(initialState: PlaybackState) {
  const [, setPlaybackState] = useState<PlaybackState>();

  const fsm = useMemo<StateMachine>(() => {
    const stateMachine = createPlaybackStateMachine(initialState);
    stateMachine.observe('onEnterState', ({ to }) => setPlaybackState(to));
    return stateMachine;
  }, [initialState]);

  return fsm;
}
