import casual from 'casual';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { createSpotifyAPIClientForTesting } from '../../../../utils/createSpotifyAPIClient';
import { createPlaybackStateMachine, PlaybackState } from '../PlaybackState';
import { RemotePlaybackState } from '../RemotePlaybackState';
import { RepeatMode } from '../RepeatMode';

const context = createPollyContext({});

describe('RemotePlaybackState', () => {
  it('.getPlaybackState will fallback from currently playing when current player unavailable', async () => {
    const currentlyPlaying = casual.CurrentlyPlayingObject();
    context.polly.server.host('https://api.spotify.com/v1', () => {
      // https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-information-about-the-users-current-playback
      context.polly.server.get('/me/player').intercept((_, res) => {
        res.status(204).send('');
      });
      context.polly.server
        .get('/me/player/currently-playing')
        .intercept((_, res) => {
          res.status(200).send(currentlyPlaying);
        });
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

  it('.getPlaybackState will transit state to IDLE when current player unavailable', async () => {
    context.polly.server.host('https://api.spotify.com/v1', () => {
      // https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-information-about-the-users-current-playback
      context.polly.server.get('/me/player').intercept((_, res) => {
        res.status(204).send('');
      });
      context.polly.server
        .get('/me/player/currently-playing')
        .intercept((_, res) => {
          res.status(204).send('');
        });
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
