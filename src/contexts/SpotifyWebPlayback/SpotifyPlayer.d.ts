declare namespace Spotify {
  class SpotifyPlayer {
    readonly _options: Spotify.PlayerInit & { id: string };
  }
}

declare global {
  interface Window {
    Spotify: Spotify;
  }
}
