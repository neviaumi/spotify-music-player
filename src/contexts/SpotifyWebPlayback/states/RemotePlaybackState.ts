import type { AxiosInstance } from 'axios';

import type { ActivePlaybackState } from './PlaybackState';
import { PlaybackState, PlaybackType, StateMachine } from './PlaybackState';
import { RepeatMode } from './RepeatMode';

export class RemotePlaybackState implements ActivePlaybackState {
  readonly playbackType: PlaybackType = PlaybackType.Remote;

  readonly refreshInterval: number = 2000; // 2s

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
      const currentPlaying = await this.getUserCurrentlyPlayingTrack();
      if (!currentPlaying) return this.getUserRecentlyPlayingTrack();
      return currentPlaying;
    }
    return { data, from: '/me/player' };
  }

  private async getUserRecentlyPlayingTrack() {
    const { data, status } = await this.apiClient.request({
      method: 'GET',
      params: {
        additional_types: 'track',
        limit: 1,
      },
      url: '/me/player/recently-played',
    });
    if (status === 204) {
      return null;
    }
    const {
      items: [{ track: item }],
    } = data;
    if (!item) return null;
    return {
      data: {
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
        currently_playing_type: item.type,
        device: {
          is_active: false,
        },
        is_playing: false,
        item: item,
        progress_ms: 0,
        repeat_state: RepeatMode.Off,
        shuffle_state: false,
      },
      from: '/me/player/recently-played',
    };
  }
}
