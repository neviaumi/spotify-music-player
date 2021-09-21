import { jest } from '../test-runner';

export function SpotifyPlayer(attributes?: any): Spotify.Player {
  return {
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
  } as unknown as Spotify.Player;
}
