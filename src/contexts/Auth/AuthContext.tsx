import axios from 'axios';
import constate from 'constate';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router';

import {
  redirect_uris,
  token_endpoint,
} from '../../config/openidConfiguration';
import { UnAuthenticatedError } from '../../errors/UnAuthenticatedError';

function useAuth({
  accessToken,
  refreshToken,
}: {
  accessToken?: string;
  refreshToken?: string;
}) {
  const location = useLocation();
  const [imMemoryAccessToken, setAccessToken] = useState<string | undefined>(
    accessToken,
  );
  const [inMemoryRefreshToken, setInMemoryRefreshToken] = useState<
    string | undefined | null
  >(refreshToken || window.localStorage.getItem('refresh-token'));

  const setRefreshToken = useCallback((_refreshToken: string) => {
    window.localStorage.setItem('refresh-token', _refreshToken);
    setInMemoryRefreshToken(_refreshToken);
  }, []);

  const removeRefreshToken = useCallback(() => {
    window.localStorage.removeItem('refresh-token');
    setInMemoryRefreshToken(undefined);
  }, []);

  const setToken = (_accessToken: string, _refreshToken: string) => {
    setAccessToken(_accessToken);
    setRefreshToken(_refreshToken);
  };
  const exchangeTokenFromCode = async (code: string, codeVerifier: string) => {
    const {
      data: { access_token, refresh_token },
    } = await axios.request({
      data: new URLSearchParams({
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID!,
        code,
        code_verifier: codeVerifier,
        grant_type: 'authorization_code',
        redirect_uri: redirect_uris[0],
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      url: token_endpoint,
    });
    setToken(access_token, refresh_token);
  };
  const refreshAccessToken = async () => {
    if (!inMemoryRefreshToken) throw new UnAuthenticatedError(location);
    try {
      const {
        data: { access_token, refresh_token },
      } = await axios.request({
        data: new URLSearchParams({
          client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID!,
          grant_type: 'refresh_token',
          refresh_token: inMemoryRefreshToken,
        }).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        url: token_endpoint,
      });
      setToken(access_token, refresh_token);
      return access_token;
    } catch (e) {
      removeRefreshToken();
      setAccessToken(undefined);
      throw new UnAuthenticatedError(location);
    }
  };
  return {
    accessToken: imMemoryAccessToken,
    exchangeTokenFromCode,
    refreshAccessToken,
  };
}

const [AuthProvider, useAuthContext] = constate(useAuth);

export { AuthProvider, useAuthContext };
