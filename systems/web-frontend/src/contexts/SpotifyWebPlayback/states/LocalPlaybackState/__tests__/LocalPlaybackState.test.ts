import { createPollyContext } from '../../../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../../../testHelper/polly/setupMockServer';
import { SpotifyPlayer } from '../../../../../../testHelper/seeders/SpotifyPlayer';
import { WebPlaybackState } from '../../../../../../testHelper/seeders/WebPlaybackState';
import {
  describe,
  each,
  expect,
  it,
  jest,
} from '../../../../../../testHelper/test-runner';
import { createSpotifyAPIClientForTesting } from '../../../../../utils/createSpotifyAPIClient';
import { Command } from '../../../typings/Command';
import { PlaybackState } from '../../../typings/Playback';
import { RepeatMode } from '../../../typings/RepeatMode';
import { createPlaybackStateMachine } from '../../PlaybackState';
import { LocalPlaybackState } from '../index';

const context = createPollyContext(import.meta.url);

describe('Test LocalPlaybackState', () => {
  each.objects([
    ['command', 'reactedAPI', 'payload'],
    [
      Command.SetRepeatMode,
      ['PUT', '/v1/me/player/repeat'],
      {
        repeatMode: 'off',
      },
    ],
    [
      Command.SetShuffleMode,
      ['PUT', '/v1/me/player/shuffle'],
      { shouldPlayOnShuffleMode: true },
    ],
    [Command.StartPlayback, ['PUT', '/v1/me/player/play'], undefined],
  ])(({ command, reactedAPI, payload }) => {
    it(`.execute react to ${command} by ${reactedAPI}`, async () => {
      const [method, route] = reactedAPI;
      const apiHandler = jest
        .fn()
        .mockImplementation((_, res) => res.status(204));
      setupMockServer(context.polly, {
        handlers: {
          spotifyAPI: {
            [method]: {
              [route]: apiHandler,
            },
          },
        },
      });
      const stateMachine = createPlaybackStateMachine(
        PlaybackState.PLAY_ON_LOCAL_PLAYBACK,
      );
      const player = SpotifyPlayer({
        getCurrentState: jest.fn().mockResolvedValue(WebPlaybackState()),
      });

      const apiClient = createSpotifyAPIClientForTesting();
      const playback = new LocalPlaybackState({
        apiClient,
        localPlayback: player,
        stateMachine,
      });
      await playback.execute(command, payload);
      expect(apiHandler).toHaveBeenCalled();
    });
  });

  each.objects([
    ['command', 'reactedMethod', 'payload'],
    [Command.NextTrack, 'nextTrack', undefined],
    [Command.PausePlayback, 'pause', undefined],
    [Command.PreviousTrack, 'previousTrack', undefined],
    [Command.ResumePlayback, 'resume', undefined],
    [Command.SeekPlayback, 'seek', { position_ms: 0 }],
    [Command.SetVolume, 'setVolume', { volume: 100 }],
  ])(({ command, reactedMethod, payload }) => {
    it(`.execute react to ${command} by call localPlayback.${reactedMethod}`, async () => {
      const stateMachine = createPlaybackStateMachine(
        PlaybackState.PLAY_ON_LOCAL_PLAYBACK,
      );
      const player = SpotifyPlayer({
        getCurrentState: jest.fn().mockResolvedValue(WebPlaybackState()),
      });

      const apiClient = createSpotifyAPIClientForTesting();
      const playback = new LocalPlaybackState({
        apiClient,
        localPlayback: player,
        stateMachine,
      });
      await playback.execute(command, payload);
      // @ts-expect-error skipping type
      expect(player[reactedMethod]).toHaveBeenCalled();
    });
  });

  it('.getPlaybackState transit state to PLAY_ON_REMOTE_PLAYBACK if state unavailable', async () => {
    const stateMachine = createPlaybackStateMachine(
      PlaybackState.PLAY_ON_LOCAL_PLAYBACK,
    );
    const player = {
      _options: {
        id: 'fake-device-id',
      },
      getCurrentState: jest.fn().mockResolvedValue(null),
      getVolume: jest.fn().mockResolvedValue(1.0),
    } as unknown as Spotify.Player;
    const apiClient = createSpotifyAPIClientForTesting();

    const playback = new LocalPlaybackState({
      apiClient,
      localPlayback: player,
      stateMachine,
    });
    await playback.getPlaybackState();
    expect(stateMachine.state).toEqual(PlaybackState.PLAY_ON_REMOTE_PLAYBACK);
  });

  it('.getPlaybackState return current player state and current track', async () => {
    const currentState = WebPlaybackState();
    const stateMachine = createPlaybackStateMachine(
      PlaybackState.PLAY_ON_LOCAL_PLAYBACK,
    );
    const apiClient = createSpotifyAPIClientForTesting();

    const player = {
      _options: {
        id: 'fake-device-id',
        name: 'fake-playback-name',
      },
      getCurrentState: jest.fn().mockResolvedValue(currentState),
      getVolume: jest.fn().mockResolvedValue(1.0),
    } as unknown as Spotify.Player;
    const playback = new LocalPlaybackState({
      apiClient,
      localPlayback: player,
      stateMachine,
    });
    const state = await playback.getPlaybackState();
    expect(state).toStrictEqual({
      actions: { disallows: currentState.disallows },
      context: currentState.context,
      device: {
        id: player._options.id,
        is_active: true,
        is_private_session: false,
        is_restricted: false,
        name: player._options.name,
        type: 'Computer',
        volume_percent: 100,
      },
      is_active: true,
      is_paused: currentState.paused,
      progress_ms: currentState.position,
      repeat_state: RepeatMode.Context,
      shuffle_state: currentState.shuffle,
      track: currentState.track_window.current_track,
    });
  });
});
