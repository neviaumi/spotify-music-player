import type { AxiosInstance } from 'axios';

import {
  ActivePlaybackState,
  PlaybackState,
  PlaybackType,
} from '../typings/Playback';
import type { StateMachine } from '../typings/State';

export class RemotePlaybackState implements ActivePlaybackState {
  readonly apiClient: AxiosInstance;

  readonly localPlayback?: Spotify.SpotifyPlayer;

  readonly playbackType: PlaybackType = PlaybackType.Remote;

  readonly refreshInterval: number = 2000; // 2s

  readonly stateMachine: StateMachine;

  constructor(
    readonly options: {
      apiClient: AxiosInstance;
      localPlayback?: Spotify.SpotifyPlayer;
      stateMachine: StateMachine;
    },
  ) {
    this.stateMachine = options.stateMachine;
    this.localPlayback = options.localPlayback;
    this.apiClient = options.apiClient;
  }

  async getPlaybackState() {
    const { data, status } = await this.apiClient.request({
      method: 'GET',
      params: {
        additional_types: 'track',
      },
      url: '/me/player',
    });
    if (status === 204) {
      if (this.stateMachine.can(PlaybackState.IDLE)) this.stateMachine.idle();
      return null;
    }
    if (this.stateMachine.can(PlaybackState.PLAY_ON_REMOTE_PLAYBACK))
      this.stateMachine.playOnRemotePlayback();
    if (
      data.device.id === this.localPlayback?._options.id &&
      this.stateMachine.can(PlaybackState.PLAY_ON_LOCAL_PLAYBACK)
    ) {
      this.stateMachine.playOnLocalPlayback();
      return null;
    }
    if (data.currently_playing_type !== 'track') return null;

    const {
      device,
      shuffle_state,
      repeat_state,
      progress_ms,
      is_playing,
      item: track,
      actions,
    } = data;

    return {
      actions,
      device,
      is_active: device.is_active,
      is_paused: !is_playing,
      progress_ms,
      repeat_state,
      shuffle_state,
      track,
    };
  }
}
