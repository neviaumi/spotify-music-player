const result = {
  player: {
    _options: {
      id: 'mock-local-player-device-id',
    },
    getCurrentState: jest.fn(),
  },
  playerError: undefined,
};

export const useLocalSpotifyPlayback = () => result;
