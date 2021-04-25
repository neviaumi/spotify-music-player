import casual from 'casual';

import { PlaybackState } from '../../typings/Playback';
import { LocalPlaybackState } from '../LocalPlaybackState';
import { createPlaybackStateMachine } from '../PlaybackState';
import { RepeatMode } from '../RepeatMode';

describe('Test LocalPlaybackState', () => {
  it('.getPlaybackState transit state to PLAY_ON_REMOTE_PLAYBACK if state unavailable', async () => {
    const stateMachine = createPlaybackStateMachine(
      PlaybackState.PLAY_ON_LOCAL_PLAYBACK,
    );
    const player = ({
      _options: {
        id: 'fake-device-id',
      },
      getCurrentState: jest.fn().mockResolvedValue(null),
      getVolume: jest.fn().mockResolvedValue(1.0),
    } as unknown) as Spotify.SpotifyPlayer;
    const playback = new LocalPlaybackState({
      localPlayback: player,
      stateMachine,
    });
    await playback.getPlaybackState();
    expect(stateMachine.state).toEqual(PlaybackState.PLAY_ON_REMOTE_PLAYBACK);
  });

  it('.getPlaybackState return current player state and current track', async () => {
    const currentState = casual.WebPlaybackState();
    const stateMachine = createPlaybackStateMachine(
      PlaybackState.PLAY_ON_LOCAL_PLAYBACK,
    );
    const player = ({
      _options: {
        id: 'fake-device-id',
        name: 'fake-playback-name',
      },
      getCurrentState: jest.fn().mockResolvedValue(currentState),
      getVolume: jest.fn().mockResolvedValue(1.0),
    } as unknown) as Spotify.SpotifyPlayer;
    const playback = new LocalPlaybackState({
      localPlayback: player,
      stateMachine,
    });
    const state = await playback.getPlaybackState();
    expect(state).toStrictEqual({
      actions: { disallows: currentState.disallows },
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
      repeat_state: RepeatMode.Track,
      shuffle_state: currentState.shuffle,
      track: currentState.track_window.current_track,
    });
  });
});
