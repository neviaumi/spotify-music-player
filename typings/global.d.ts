import * as spotify from './spotify';

declare global {
  export namespace Spotify {
    export type Playlist = spotify.Playlist;
    export type Track = spotify.Track;
    export type Artist = spotify.Artist;
    export type Album = spotify.Album;
  }

  export namespace TestUtils {
    export type JestMock<T> = {
      [K in keyof T]?: T[K] & jest.Mock;
    } &
      jest.Mock;
  }
}
