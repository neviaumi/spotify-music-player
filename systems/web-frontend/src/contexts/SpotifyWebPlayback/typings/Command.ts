import type { RepeatMode } from './RepeatMode';

export enum Command {
  NextTrack = 'nextTrack',
  PausePlayback = 'pausePlayback',
  PreviousTrack = 'previousTrack',
  ResumePlayback = 'resumePlayback',
  SeekPlayback = 'seekPlayback',
  SetRepeatMode = 'setRepeatMode',
  SetShuffleMode = 'setShuffleMode',
  SetVolume = 'setVolume',
  StartPlayback = 'startPlayback',
}

export type NextTrackPayload = void;
export type PausePlaybackPayload = void;
export type PreviousTrackPayload = void;
export type ResumePlaybackPayload = void;
export type SeekPlaybackPayload = {
  position_ms: number;
};
export type SetRepeatModePayload = {
  repeatMode: RepeatMode;
};
export type SetShuffleModePayload = {
  shouldPlayOnShuffleMode: boolean;
};
export type SetVolumePayload = {
  volume: number;
};
export type StartPlaybackPayload =
  | {
      context_uri: string;
      offset: {
        position: number;
      };
    }
  | { uris: string[] };

export interface CommandExecutor {
  // (command: Command, payload: unknown): Promise<void>;
  (command: Command.NextTrack, payload: NextTrackPayload): Promise<void>;
  (
    command: Command.PreviousTrack,
    payload: PreviousTrackPayload,
  ): Promise<void>;
  (
    command: Command.PausePlayback,
    payload: PausePlaybackPayload,
  ): Promise<void>;
  (
    command: Command.ResumePlayback,
    payload: ResumePlaybackPayload,
  ): Promise<void>;
  (command: Command.SeekPlayback, payload: SeekPlaybackPayload): Promise<void>;
  (
    command: Command.SetRepeatMode,
    payload: SetRepeatModePayload,
  ): Promise<void>;
  (
    command: Command.SetShuffleMode,
    payload: SetShuffleModePayload,
  ): Promise<void>;
  (command: Command.SetVolume, payload: SetVolumePayload): Promise<void>;
  (
    command: Command.StartPlayback,
    payload: StartPlaybackPayload,
  ): Promise<void>;
}
