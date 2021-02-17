declare namespace Spotify {
  class SpotifyPlayer {
    readonly _options: Spotify.PlayerInit & { id: string };
  }

  interface Album {
    id: string;
    images: Image[];
    name: string;
    uri: string;
  }
}

declare global {
  interface Window {
    Spotify: Spotify;
  }
}
