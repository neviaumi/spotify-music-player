import casual from 'casual';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../../testHelper/polly/setupMockServer';
import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import { createPlaybackStateMachine, PlaybackState } from '../PlaybackState';
import { RemotePlaybackState } from '../RemotePlaybackState';
import { RepeatMode } from '../RepeatMode';

const context = createPollyContext({});

describe('RemotePlaybackState', () => {
  it('.getPlaybackState will fallback to currently playing when current player unavailable', async () => {
    const currentlyPlaying = casual.CurrentlyPlayingObject();
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player': (_, res) => {
              res.status(204).send('');
            },
            '/v1/me/player/currently-playing': (_, res) => {
              res.status(200).send(currentlyPlaying);
            },
          },
        },
      },
    });
    const stateMachine = createPlaybackStateMachine(
      PlaybackState.PLAY_ON_REMOTE_PLAYBACK,
    );
    const apiClient = createSpotifyAPIClientForTesting();
    const state = new RemotePlaybackState(apiClient, stateMachine);
    const playbackState = await state.getPlaybackState();
    expect(stateMachine.state).toEqual(PlaybackState.IDLE);
    expect(playbackState).toEqual({
      actions: currentlyPlaying.actions,
      device: {
        is_active: false,
      },
      is_active: false,
      is_paused: true,
      progress_ms: 0,
      repeat_state: RepeatMode.Off,
      shuffle_state: false,
      track: currentlyPlaying.item,
    });
  });

  it('.getPlaybackState will fallback to recently played track when current playing info unavailable', async () => {
    const recentlyPlayedObject = casual.PlayHistoryObject({});
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player': (_, res) => {
              res.status(204).send('');
            },
            '/v1/me/player/currently-playing': (_, res) => {
              res.status(204).send('');
            },
            '/v1/me/player/recently-played': (_, res) => {
              res
                .status(200)
                .json(casual.CursorPagingObject([recentlyPlayedObject]));
            },
          },
        },
      },
    });
    const stateMachine = createPlaybackStateMachine(
      PlaybackState.PLAY_ON_REMOTE_PLAYBACK,
    );
    const apiClient = createSpotifyAPIClientForTesting();
    const state = new RemotePlaybackState(apiClient, stateMachine);
    const playbackState = await state.getPlaybackState();
    expect(stateMachine.state).toEqual(PlaybackState.IDLE);
    expect(playbackState).toStrictEqual({
      actions: {
        disallows: {
          pausing: true,
          peeking_next: true,
          peeking_prev: true,
          resuming: false,
          seeking: true,
          skipping_next: true,
          skipping_prev: true,
        },
      },
      device: {
        is_active: false,
      },
      is_active: false,
      is_paused: true,
      progress_ms: 0,
      repeat_state: 'off',
      shuffle_state: false,
      track: recentlyPlayedObject.track,
    });
  });

  it('.getPlaybackState will transit state to IDLE without error when all fallback 204', async () => {
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player': (_, res) => {
              res.status(204).send('');
            },
            '/v1/me/player/currently-playing': (_, res) => {
              res.status(204).send('');
            },
            '/v1/me/player/recently-played': (_, res) => {
              res.status(204).send('');
            },
          },
        },
      },
    });
    const stateMachine = createPlaybackStateMachine(
      PlaybackState.PLAY_ON_REMOTE_PLAYBACK,
    );
    const apiClient = createSpotifyAPIClientForTesting();
    const state = new RemotePlaybackState(apiClient, stateMachine);
    const playbackState = await state.getPlaybackState();
    expect(stateMachine.state).toEqual(PlaybackState.IDLE);
    expect(playbackState).toBeNull();
  });

  it('.getPlaybackState will transit state to PlayOnRemote when current state is IDLE', async () => {
    const currentPlayingContext = casual.CurrentlyPlayingContextObject();
    context.polly.server.host('https://api.spotify.com/v1', () => {
      context.polly.server.get('/me/player').intercept((_, res) => {
        res.status(200).json(currentPlayingContext);
      });
    });
    const stateMachine = createPlaybackStateMachine(PlaybackState.IDLE);
    const apiClient = createSpotifyAPIClientForTesting();
    const state = new RemotePlaybackState(apiClient, stateMachine);
    await state.getPlaybackState();
    expect(stateMachine.state).toEqual(PlaybackState.PLAY_ON_REMOTE_PLAYBACK);
  });

  it('.getPlaybackState return current player state and current track', async () => {
    const currentPlayingContext = casual.CurrentlyPlayingContextObject();
    context.polly.server.host('https://api.spotify.com/v1', () => {
      context.polly.server.get('/me/player').intercept((_, res) => {
        res.status(200).json(currentPlayingContext);
      });
    });
    const stateMachine = createPlaybackStateMachine(
      PlaybackState.PLAY_ON_REMOTE_PLAYBACK,
    );
    const apiClient = createSpotifyAPIClientForTesting();
    const state = new RemotePlaybackState(apiClient, stateMachine);
    const playbackState = await state.getPlaybackState();
    expect(playbackState).toStrictEqual({
      actions: currentPlayingContext.actions,
      device: currentPlayingContext.device,
      is_active: currentPlayingContext.device.is_active,
      is_paused: !currentPlayingContext.is_playing,
      progress_ms: currentPlayingContext.progress_ms,
      repeat_state: currentPlayingContext.repeat_state,
      shuffle_state: currentPlayingContext.shuffle_state,
      track: currentPlayingContext.item,
    });
  });

  it('.getPlaybackState skip return if current playing non track', async () => {
    const currentPlayingContext = casual.CurrentlyPlayingContextObject({
      currently_playing_type: 'episode',
    });
    context.polly.server.host('https://api.spotify.com/v1', () => {
      context.polly.server.get('/me/player').intercept((_, res) => {
        res.status(200).json(currentPlayingContext);
      });
    });
    const stateMachine = createPlaybackStateMachine(
      PlaybackState.PLAY_ON_REMOTE_PLAYBACK,
    );
    const apiClient = createSpotifyAPIClientForTesting();
    const state = new RemotePlaybackState(apiClient, stateMachine);
    const playbackState = await state.getPlaybackState();
    expect(playbackState).toBeNull();
  });
});
