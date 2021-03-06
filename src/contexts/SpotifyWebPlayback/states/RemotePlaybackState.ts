import type { AxiosInstance } from 'axios';

import type { ActivePlaybackState } from './PlaybackState';
import { PlaybackState, PlaybackType, StateMachine } from './PlaybackState';
import { RepeatMode } from './RepeatMode';

export class RemotePlaybackState implements ActivePlaybackState {
  readonly playbackType: PlaybackType = PlaybackType.Remote;

  readonly refreshInterval: number = 10000; // 10s

  readonly stateMachine: StateMachine;

  constructor(
    private readonly apiClient: AxiosInstance,
    stateMachine: StateMachine,
  ) {
    this.stateMachine = stateMachine;
  }

  async getPlaybackState() {
    const playerState = await this.getUserPlayer();
    const { data, from } = playerState || {};
    if (!data) return null;
    const {
      device,
      shuffle_state,
      repeat_state,
      progress_ms,
      is_playing,
      item: track,
      currently_playing_type,
      actions,
    } = data;
    if (currently_playing_type !== 'track') return null;
    if (
      from === '/me/player' &&
      this.stateMachine.can(PlaybackState.PLAY_ON_REMOTE_PLAYBACK)
    )
      this.stateMachine.playOnRemotePlayback();
    const state = {
      actions,
      device,
      is_active: device.is_active,
      is_paused: !is_playing,
      progress_ms,
      repeat_state,
      shuffle_state,
      track,
    };
    return state;
  }

  private async getUserCurrentlyPlayingTrack() {
    const { data, status } = await this.apiClient.request({
      method: 'GET',
      params: {
        additional_types: 'track',
      },
      url: '/me/player/currently-playing',
    });
    if (status === 204) {
      return null;
    }
    return {
      data: {
        actions: data.actions,
        currently_playing_type: data.currently_playing_type,
        device: {
          is_active: false,
        },
        is_playing: false,
        item: data.item,
        progress_ms: 0,
        repeat_state: RepeatMode.Off,
        shuffle_state: false,
      },
      from: '/me/player/currently-playing',
    };
  }

  private async getUserPlayer() {
    const { data, status } = await this.apiClient.request({
      method: 'GET',
      params: {
        additional_types: 'track',
      },
      url: '/me/player',
    });
    if (status === 204) {
      if (this.stateMachine.can(PlaybackState.IDLE)) this.stateMachine.idle();
      return this.getUserCurrentlyPlayingTrack();
    }
    return { data, from: '/me/player' };
  }
}
