import { PlaybackDevice } from '../../typings/Playback';
import { RepeatMode } from '../../typings/RepeatMode';

export interface IRemotePlaybackState {
  actions: {
    disallows: Spotify.PlaybackDisallows;
  };
  context: Spotify.PlaybackContext;
  currently_playing_type: string;
  device: PlaybackDevice;
  is_playing: string;
  item: Spotify.Track;
  progress_ms: number;
  repeat_state: RepeatMode;
  shuffle_state: boolean;
}
