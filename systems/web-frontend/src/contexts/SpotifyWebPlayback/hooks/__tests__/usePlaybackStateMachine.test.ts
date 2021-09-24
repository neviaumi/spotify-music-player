import {
  describe,
  each,
  expect,
  it,
} from '../../../../../testHelper/test-runner';
import { renderHook } from '../../../../../testHelper/testing-library/react-hooks';
import { IdlePlaybackState } from '../../states/IdlePlaybackState';
import { LocalPlaybackState } from '../../states/LocalPlaybackState';
import { RemotePlaybackState } from '../../states/RemotePlaybackState';
import { PlaybackState } from '../../typings/Playback';
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

  it(`Use IdlePlaybackState for get current playback state while state is ${PlaybackState.IDLE}`, async () => {
    const { result } = renderHook(() =>
      usePlaybackStateMachine(PlaybackState.IDLE),
    );
    expect(
      result.current.getPlayback({
        apiClient: {} as any,
      }),
    ).toBeInstanceOf(IdlePlaybackState);
  });

  each.array<[PlaybackState]>([
    [PlaybackState.INIT],
    [PlaybackState.PLAY_ON_REMOTE_PLAYBACK],
  ])(currentState => {
    it(`Use RemotePlaybackState for get current playback state while state is ${currentState}`, async () => {
      const { result } = renderHook(() =>
        usePlaybackStateMachine(currentState),
      );
      expect(
        result.current.getPlayback({
          apiClient: {} as any,
        }),
      ).toBeInstanceOf(RemotePlaybackState);
    });
  });
});
