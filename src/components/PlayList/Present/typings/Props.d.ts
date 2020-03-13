export interface Props {
  title: string;
  playlists?: Spotify.Playlist[];
  [key: string]: unknown;
}
