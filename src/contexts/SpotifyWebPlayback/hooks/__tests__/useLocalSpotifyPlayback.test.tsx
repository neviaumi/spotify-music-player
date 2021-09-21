import {
  describe,
  expect,
  it,
  jest,
} from '../../../../../testHelper/test-runner';
import { renderHook } from '../../../../../testHelper/testing-library/react-hooks';
import { AppConfigurationProvider } from '../../../AppConfigureation/AppConfiguration';
import { TestAuthProvider } from '../../../Auth';
import { useLocalSpotifyPlayback } from '../useLocalSpotifyPlayback';

describe('Test useLocalSpotifyPlayback', () => {
  it('Create local spotify playback', async () => {
    const { result, waitFor } = renderHook(
      () =>
        useLocalSpotifyPlayback({
          onPlayerStateChanged: jest.fn(),
        }),
      {
        wrapper: ({ children }) => (
          <TestAuthProvider>
            <AppConfigurationProvider appMode={'development'}>
              {children}
            </AppConfigurationProvider>
          </TestAuthProvider>
        ),
      },
    );
    await waitFor(() => {
      // https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#initializing-the-sdk
      expect(window.onSpotifyWebPlaybackSDKReady).toBeDefined();
    });
    window.onSpotifyWebPlaybackSDKReady();
    const mockPlayer = {
      _options: {},
      addListener: jest.fn().mockImplementation((event, callback) => {
        if (event === 'ready') {
          setTimeout(() => callback({ device_id: 'mockId' }));
        }
      }),
      connect: jest.fn(),
    };
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
    // @ts-expect-error
    expect(mockPlayer._options.id).toEqual('mockId');
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
