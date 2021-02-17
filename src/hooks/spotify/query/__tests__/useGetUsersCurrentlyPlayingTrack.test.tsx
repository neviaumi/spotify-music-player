import { renderHook } from '@testing-library/react-hooks';
import { mutate } from 'swr';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../../App';
import { useGetUsersCurrentlyPlayingTrack } from '../useGetUsersCurrentlyPlayingTrack';

const _context = createPollyContext();
describe('Test useGetUsersCurrentlyPlayingTrack', () => {
  it('Do nothing if disabled', async () => {
    const { result } = renderHook(
      () => useGetUsersCurrentlyPlayingTrack(false, { suspense: false }),
      {
        wrapper: ({ children }) => <TestApp>{children}</TestApp>,
      },
    );
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();
  });

  it('Return response body of API', async () => {
    _context.polly.server.host('https://api.spotify.com/v1', () => {
      _context.polly.server
        .get('/me/player/currently-playing')
        .intercept((_, res) => {
          res.status(200).json({
            currently_playing_type: 'track',
            item: {},
            progress_ms: 0,
            timestamps: 0,
          });
        });
    });
    const { result, waitFor } = renderHook(
      () => useGetUsersCurrentlyPlayingTrack(true, { suspense: false }),
      {
        wrapper: ({ children }) => <TestApp>{children}</TestApp>,
      },
    );
    await waitFor(() => {
      expect(result.current.error).toBeUndefined();
      expect(result.current.data).toStrictEqual({
        currently_playing_type: 'track',
        item: {},
        progress_ms: 0,
        timestamps: 0,
      });
    });
  });

  it('Return undefined if status code is 204', async () => {
    _context.polly.server.host('https://api.spotify.com/v1', () => {
      _context.polly.server
        .get('/me/player/currently-playing')
        .intercept((_, res) => {
          res.status(204).json({
            currently_playing_type: 'track',
            item: {},
            progress_ms: 0,
            timestamps: 0,
          });
        });
    });

    const { result, waitFor } = renderHook(
      () => useGetUsersCurrentlyPlayingTrack(true, { suspense: false }),
      {
        wrapper: ({ children }) => <TestApp>{children}</TestApp>,
      },
    );
    mutate(['GET', '/me/player/currently-playing']);

    await waitFor(() => {
      expect(result.current.error).toBeUndefined();
      expect(result.current.data).toBeNull();
    });
  });

  it('Return undefined if currently_playing_type is episode', async () => {
    _context.polly.server.host('https://api.spotify.com/v1', () => {
      _context.polly.server
        .get('/me/player/currently-playing')
        .intercept((_, res) => {
          res.status(200).json({
            currently_playing_type: 'episode',
            item: {},
            progress_ms: 0,
            timestamps: 0,
          });
        });
    });
    const { result, waitFor } = renderHook(
      () => useGetUsersCurrentlyPlayingTrack(true, { suspense: false }),
      {
        wrapper: ({ children }) => <TestApp>{children}</TestApp>,
      },
    );
    mutate(['GET', '/me/player/currently-playing']);
    await waitFor(() => {
      expect(result.current.error).toBeUndefined();
      expect(result.current.data).toBeNull();
    });
  });
});
