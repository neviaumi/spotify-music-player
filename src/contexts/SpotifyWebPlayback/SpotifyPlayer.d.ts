declare namespace Spotify {
  interface Track {
    // if track from https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-the-users-currently-playing-track will get disc_number
    disc_number?: number;
  }
}

declare global {
  interface Window {
    Spotify: Spotify;
  }
}
