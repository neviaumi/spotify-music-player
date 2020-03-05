// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as spotify from './spotify';

declare global {
  export namespace Spotify {
    export type Playlist = spotify.Playlist;
  }

  export namespace TestUtils {
    export type JestMock<T> = {
      [K in keyof T]?: T[K] & jest.Mock;
    } &
      jest.Mock;
  }
}
