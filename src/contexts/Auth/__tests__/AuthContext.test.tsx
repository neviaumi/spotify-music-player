import { renderHook } from '@testing-library/react-hooks';

import { createPollyContext } from '../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../App';
import { UnAuthenticatedError } from '../../../errors/UnAuthenticatedError';
import { useAuthContext } from '../AuthContext';

const context = createPollyContext();

describe('AuthContext', () => {
  beforeEach(() => window.localStorage.clear());
  it('exchangeTokenFromCode persist refreshToken', async () => {
    context.polly.server.host('https://accounts.spotify.com', () => {
      context.polly.server
        .post('/api/token')
        .times(1)
        .intercept((_, res, interceptor) => {
          interceptor.stopPropagation();
          res.setHeader('Access-Control-Allow-Headers', 'Authorization');
          res.setHeader('Access-Control-Allow-Methods', '*');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.status(200).json({
            access_token: 'accessTokenFromCode',
            refresh_token: 'refreshTokenFromCode',
          });
        });
    });
    const { result, waitFor } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    });
    await result.current.exchangeTokenFromCode('code', 'codeVerifier');
    await waitFor(() => {
      expect(result.current.accessToken).toEqual('accessTokenFromCode');
    });
    expect(window.localStorage.getItem('refresh-token')).toEqual(
      'refreshTokenFromCode',
    );
  });

  it('refreshAccessToken error if no persisted refresh token found', async () => {
    const { result } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    });
    await expect(result.current.refreshAccessToken()).rejects.toThrow(
      UnAuthenticatedError,
    );
  });

  it('refreshAccessToken exchange access token from persisted refresh token', async () => {
    window.localStorage.setItem('refresh-token', 'refreshToken');
    context.polly.server.host('https://accounts.spotify.com', () => {
      context.polly.server
        .post('/api/token')
        .times(1)
        .intercept((_, res, interceptor) => {
          interceptor.stopPropagation();
          res.setHeader('Access-Control-Allow-Headers', 'Authorization');
          res.setHeader('Access-Control-Allow-Methods', '*');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.status(200).json({
            access_token: 'newAccessToken',
            refresh_token: 'newRefreshToken',
          });
        });
    });
    const { result, waitFor } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }) => <TestApp>{children}</TestApp>,
    });
    await result.current.refreshAccessToken();
    await waitFor(() => {
      expect(result.current.accessToken).toEqual('newAccessToken');
    });
    expect(window.localStorage.getItem('refresh-token')).toEqual(
      'newRefreshToken',
    );
  });

  it('getOrRefreshAccessToken return access token if cached token not expired', async () => {
    const { result } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }) => (
        <TestApp
          AuthProviderProps={{
            accessToken: 'fake-token',
            tokenExpireTime: Number.POSITIVE_INFINITY,
          }}
        >
          {children}
        </TestApp>
      ),
    });
    await expect(result.current.getOrRefreshAccessToken()).resolves.toEqual(
      'fake-token',
    );
  });

  it('getOrRefreshAccessToken refresh access token if token expired', async () => {
    window.localStorage.setItem('refresh-token', 'refreshToken');
    context.polly.server.host('https://accounts.spotify.com', () => {
      context.polly.server
        .post('/api/token')
        .times(1)
        .intercept((_, res, interceptor) => {
          interceptor.stopPropagation();
          res.status(200).json({
            access_token: 'newAccessToken',
            refresh_token: 'newRefreshToken',
          });
        });
    });
    const { result } = renderHook(() => useAuthContext(), {
      wrapper: ({ children }) => (
        <TestApp
          AuthProviderProps={{
            accessToken: 'fake-token',
            tokenExpireTime: Number.NEGATIVE_INFINITY,
          }}
        >
          {children}
        </TestApp>
      ),
    });
    await expect(result.current.getOrRefreshAccessToken()).resolves.toEqual(
      'newAccessToken',
    );
  });
});
