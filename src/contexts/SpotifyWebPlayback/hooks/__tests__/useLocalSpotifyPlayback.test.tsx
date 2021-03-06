import { renderHook } from '@testing-library/react-hooks';

import { TestAuthProvider } from '../../../Auth';
import { useLocalSpotifyPlayback } from '../useLocalSpotifyPlayback';

jest.unmock('../useLocalSpotifyPlayback');

describe('Test useLocalSpotifyPlayback', () => {
  it('Create local spotify playback', async () => {
    const { result, waitFor } = renderHook(
      () =>
        useLocalSpotifyPlayback({
          onPlayerStateChanged: jest.fn(),
        }),
      {
        wrapper: ({ children }) => (
          <TestAuthProvider>{children}</TestAuthProvider>
        ),
      },
    );
    await waitFor(() => {
      // https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#initializing-the-sdk
      expect(window.onSpotifyWebPlaybackSDKReady).toBeDefined();
    });
    window.onSpotifyWebPlaybackSDKReady();
    const mockPlayer = {
      addListener: jest.fn().mockImplementation((event, callback) => {
        if (event === 'ready') setImmediate(callback);
      }),
      connect: jest.fn(),
    };
    // @ts-expect-error Mock because onSpotifyWebPlaybackSDKReady never get call in test
    window.Spotify = {
      Player: jest.fn().mockReturnValue(mockPlayer),
    };
    await waitFor(() => {
      expect(result.current.player).toBeDefined();
    });
    expect(mockPlayer.addListener).toHaveBeenCalled();
    expect(mockPlayer.connect).toHaveBeenCalled();
    const eventListened = mockPlayer.addListener.mock.calls
      .map(call => call[0])
      .sort();
    expect(eventListened).toEqual(
      [
        'ready',
        'player_state_changed',
        'account_error',
        'initialization_error',
        'playback_error',
        'authentication_error',
      ].sort(),
    );
  });
});
