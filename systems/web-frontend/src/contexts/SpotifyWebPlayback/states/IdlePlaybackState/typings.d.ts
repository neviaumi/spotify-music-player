import { RepeatMode } from '../../typings/RepeatMode';

export interface ICurrentlyPlayingTrack {
  actions: {
    disallows: Spotify.PlaybackDisallows;
  };
  context: Spotify.PlaybackContext;
  currently_playing_type: string;
  is_playing: boolean;
  item: Spotify.Track;
  progress_ms: number;
  repeat_state: RepeatMode;
  shuffle_state: boolean;
}

export interface IRecentlyPlayedTracks {
  items: {
    context: Spotify.PlaybackContext;
    track: Spotify.Track;
  }[];
}
