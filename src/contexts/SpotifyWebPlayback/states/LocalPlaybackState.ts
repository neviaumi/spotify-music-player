import {
  ActivePlaybackState,
  PlaybackState,
  PlaybackType,
  StateMachine,
} from './PlaybackState';
import { RepeatMode } from './RepeatMode';

export class LocalPlaybackState implements ActivePlaybackState {
  readonly playbackType: PlaybackType = PlaybackType.Local;

  readonly refreshInterval: number = 500; // 0.5s

  readonly stateMachine: StateMachine;

  constructor(
    private readonly localPlayback: Spotify.SpotifyPlayer,
    stateMachine: StateMachine,
  ) {
    this.stateMachine = stateMachine;
  }

  async getPlaybackState() {
    const state = await this.localPlayback.getCurrentState();
    if (!state) {
      if (this.stateMachine.can(PlaybackState.PLAY_ON_REMOTE_PLAYBACK))
        this.stateMachine.playOnRemotePlayback();
      return null;
    }
    const {
      disallows,
      position,
      paused,
      track_window,
      repeat_mode,
      shuffle,
    } = state;
    return {
      actions: { disallows },
      device: {
        id: this.localPlayback._options.id,
        is_active: true,
        is_private_session: false,
        is_restricted: false,
        name: this.localPlayback._options.name,
        type: 'Computer',
        volume_percent: (this.localPlayback._options.volume ?? 0) * 100,
      },
      is_active: true,
      is_paused: paused,
      progress_ms: position,
      repeat_state: {
        0: RepeatMode.Off,
        1: RepeatMode.Track,
        2: RepeatMode.Context,
      }[repeat_mode],
      shuffle_state: shuffle,
      track: track_window.current_track,
    };
  }
}
