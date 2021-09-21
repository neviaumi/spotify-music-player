import { jest } from '../../../../../testHelper/test-runner';

const result = {
  player: {
    _options: {
      id: 'mock-local-player-device-id',
    },
    getCurrentState: jest.fn(),
    getVolume: jest.fn().mockReturnValue(0),
  },
  playerError: undefined,
};

export const useLocalSpotifyPlayback = () => result;
