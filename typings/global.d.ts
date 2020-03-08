import { Polly } from '@pollyjs/core';

import * as spotify from './spotify';

declare global {
  export namespace Spotify {
    export type Playlist = spotify.Playlist;
    export type Track = spotify.Track;
    export type Artist = spotify.Artist;
  }

  export namespace TestUtils {
    export type JestMock<T> = {
      [K in keyof T]?: T[K] & jest.Mock;
    } &
      jest.Mock;
  }

  namespace NodeJS {
    interface Global {
      pollyContext: { polly?: Polly };
      afterEach(callback: () => Promise<unknown>): void;
    }
  }
}
