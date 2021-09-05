import casual from 'casual';

function SpotifyPlayerFactory(attributes?: any): Spotify.Player {
  return ({
    _options: {
      id: 'fake-device-id',
      name: 'fake-device',
    },
    getCurrentState: jest.fn(),
    getVolume: jest.fn(),
    nextTrack: jest.fn(),
    pause: jest.fn(),
    previousTrack: jest.fn(),
    resume: jest.fn(),
    seek: jest.fn(),
    setVolume: jest.fn(),
    ...attributes,
  } as unknown) as Spotify.Player;
}

casual.define('SpotifyPlayer', SpotifyPlayerFactory);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Casual {
    export interface Casual {
      SpotifyPlayer: typeof SpotifyPlayerFactory;
    }
  }
}
