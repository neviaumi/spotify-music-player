import { renderHook } from '@testing-library/react-hooks';

import { LocalPlaybackState } from '../../states/LocalPlaybackState';
import { PlaybackState } from '../../states/PlaybackState';
import { RemotePlaybackState } from '../../states/RemotePlaybackState';
import { usePlaybackStateMachine } from '../usePlaybackStateMachine';

describe('Test usePlaybackStateMachine', () => {
  it('usePlaybackStateMachine create state machine', async () => {
    const { result, waitFor } = renderHook(() =>
      usePlaybackStateMachine(PlaybackState.INIT),
    );
    result.current.playOnRemotePlayback();
    await waitFor(() =>
      expect(
        result.current.is(PlaybackState.PLAY_ON_REMOTE_PLAYBACK),
        `State machine state is ${PlaybackState.PLAY_ON_REMOTE_PLAYBACK}`,
      ).toBeTruthy(),
    );
  });

  it(`Use LocalPlaybackState for get current playback state while state is ${PlaybackState.PLAY_ON_LOCAL_PLAYBACK}`, async () => {
    const { result, waitFor } = renderHook(() =>
      usePlaybackStateMachine(PlaybackState.INIT),
    );
    result.current.playOnLocalPlayback();
    await waitFor(() =>
      expect(
        result.current.is(PlaybackState.PLAY_ON_LOCAL_PLAYBACK),
        `State machine state is ${PlaybackState.PLAY_ON_LOCAL_PLAYBACK}`,
      ).toBeTruthy(),
    );
    expect(
      result.current.getPlayback({
        apiClient: {} as any,
        localPlayback: {} as any,
      }),
    ).toBeInstanceOf(LocalPlaybackState);
  });

  it(`Use RemotePlaybackState for get current playback state
while state is ${PlaybackState.PLAY_ON_LOCAL_PLAYBACK} and localPlayback unavailable`, async () => {
    const { result, waitFor } = renderHook(() =>
      usePlaybackStateMachine(PlaybackState.INIT),
    );
    result.current.playOnLocalPlayback();
    await waitFor(() =>
      expect(
        result.current.is(PlaybackState.PLAY_ON_LOCAL_PLAYBACK),
        `State machine state is ${PlaybackState.PLAY_ON_LOCAL_PLAYBACK}`,
      ).toBeTruthy(),
    );
    expect(
      result.current.getPlayback({
        apiClient: {} as any,
      }),
    ).toBeInstanceOf(RemotePlaybackState);
  });

  it.each([
    [PlaybackState.INIT],
    [PlaybackState.PLAY_ON_REMOTE_PLAYBACK],
    [PlaybackState.IDLE],
  ])(
    'Use RemotePlaybackState for get current playback state while state is %s',
    async currentState => {
      const { result } = renderHook(() =>
        usePlaybackStateMachine(currentState),
      );
      expect(
        result.current.getPlayback({
          apiClient: {} as any,
        }),
      ).toBeInstanceOf(RemotePlaybackState);
    },
  );
});
