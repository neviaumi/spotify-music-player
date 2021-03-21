declare namespace Spotify {
  interface Track {
    disc_number?: number;
    duration_ms: number;
    // if track from https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-the-users-currently-playing-track will get disc_number
    track_number?: number;
  }
}

declare global {
  interface Window {
    Spotify: Spotify;
  }
}
