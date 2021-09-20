import { createPollyContext } from '../../../testHelper/polly/createPollyContext';
import { renderHook } from '../../../testHelper/testing-library/react-hooks';
import { TestApp } from '../../App';
import { useSpotifyAPIClient } from '../useSpotifyAPIClient';

const context = createPollyContext({
  pollyConfig: { mode: 'passthrough' },
});

describe('useSpotifyAPIClient', () => {
  it('call spotify api by given token', async () => {
    context.polly.server.host('https://api.spotify.com', () => {
      context.polly.server.get('/v1/fake-endpoint').intercept((_, res) => {
        res.status(200).json({});
      });
    });
    const { result } = renderHook(() => useSpotifyAPIClient(), {
      wrapper: ({ children }) => (
        <TestApp AuthProviderProps={{ accessToken: 'fakeAccessToken' }}>
          {children}
        </TestApp>
      ),
    });
    const response = await result.current.request({
      method: 'GET',
      url: '/fake-endpoint',
    });
    expect(response.config.headers.Authorization).toEqual(
      'Bearer fakeAccessToken',
    );
  });

  it('no retry if api endpoint non 401 fail', async () => {
    context.polly.server.host('https://api.spotify.com', () => {
      context.polly.server
        .get('/v1/fake-endpoint')
        .times(1)
        .intercept((_, res, interceptor) => {
          interceptor.stopPropagation();
          res.status(400).json({});
        });
    });
    const { result } = renderHook(() => useSpotifyAPIClient(), {
      wrapper: ({ children }) => (
        <TestApp AuthProviderProps={{ accessToken: 'fakeAccessToken' }}>
          {children}
        </TestApp>
      ),
    });
    await expect(
      result.current.request({
        method: 'GET',
        url: '/fake-endpoint',
      }),
    ).rejects.toThrow(Error);
  });

  it('retry api call if given token return 401', async () => {
    window.localStorage.setItem('refresh-token', 'fakeRefreshToken');
    context.polly.server.host('https://accounts.spotify.com', () => {
      context.polly.server
        .post('/api/token')
        .intercept((_, res, interceptor) => {
          interceptor.stopPropagation();
          res.status(200).json({
            access_token: 'newAccessToken',
            refresh_token: 'newRefreshToken',
          });
        });
    });
    context.polly.server.host('https://api.spotify.com', () => {
      context.polly.server
        .get('/v1/fake-endpoint')
        .times(1)
        .intercept((_, res, interceptor) => {
          interceptor.stopPropagation();
          res.status(401).json({});
        });
      context.polly.server
        .get('/v1/fake-endpoint')
        .times(1)
        .intercept((_, res, interceptor) => {
          interceptor.stopPropagation();
          res.status(200).json({});
        });
    });
    const { result } = renderHook(() => useSpotifyAPIClient(), {
      wrapper: ({ children }) => (
        <TestApp
          AuthProviderProps={{
            accessToken: 'fakeAccessToken',
          }}
        >
          {children}
        </TestApp>
      ),
    });
    const response = await result.current.request({
      method: 'GET',
      url: '/fake-endpoint',
    });
    expect(response.config.headers.Authorization).toEqual(
      'Bearer newAccessToken',
    );
  });

  it('throw exception if singToken always error', async () => {
    window.localStorage.setItem('refresh-token', 'fakeRefreshToken');
    context.polly.server.host('https://accounts.spotify.com', () => {
      context.polly.server
        .post('/api/token')
        .intercept((_, res, interceptor) => {
          interceptor.stopPropagation();
          res.status(400).json({});
        });
    });
    context.polly.server.host('https://api.spotify.com', () => {
      context.polly.server
        .get('/v1/fake-endpoint')
        .times(1)
        .intercept((_, res, interceptor) => {
          interceptor.stopPropagation();
          res.status(401).json({});
        });
    });
    const { result } = renderHook(() => useSpotifyAPIClient(), {
      wrapper: ({ children }) => (
        <TestApp
          AuthProviderProps={{
            accessToken: 'fakeAccessToken',
          }}
        >
          {children}
        </TestApp>
      ),
    });

    await expect(
      result.current.request({
        method: 'GET',
        url: '/fake-endpoint',
      }),
    ).rejects.toThrow();
  });
});
