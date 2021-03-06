import axios from 'axios';
import constate from 'constate';
import { useCallback, useState } from 'react';

import {
  redirect_uris,
  token_endpoint,
} from '../../config/openidConfiguration';
import { UnAuthenticatedError } from '../../errors/UnAuthenticatedError';
import { getCurrentTimestamp } from '../../utils/getCurrentTimestamp';

function useAuth({
  accessToken,
  tokenExpireTime: hardCodedExpireTime,
}: {
  accessToken?: string;
  tokenExpireTime?: number;
}) {
  const [imMemoryAccessToken, setAccessToken] = useState<string | undefined>(
    accessToken,
  );
  const [tokenExpireTime, setTokenExpireTime] = useState<number>(
    hardCodedExpireTime ?? 0,
  ); // unix timestamp

  const setRefreshToken = useCallback((_refreshToken: string) => {
    window.localStorage.setItem('refresh-token', _refreshToken);
  }, []);

  const getRefreshToken = useCallback(() => {
    return window.localStorage.getItem('refresh-token');
  }, []);

  const setToken = (
    _accessToken: string,
    _refreshToken: string,
    expireTime: number,
  ) => {
    setAccessToken(_accessToken);
    setRefreshToken(_refreshToken);
    setTokenExpireTime(expireTime);
  };
  const exchangeTokenFromCode = async (code: string, codeVerifier: string) => {
    const {
      data: { access_token, refresh_token, expires_in },
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
    setToken(
      access_token,
      refresh_token,
      (getCurrentTimestamp() + expires_in) * 1000,
    );
  };
  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new UnAuthenticatedError();
    try {
      const {
        data: { access_token, refresh_token, expires_in },
      } = await axios.request({
        data: new URLSearchParams({
          client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID!,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        url: token_endpoint,
      });
      setToken(
        access_token,
        refresh_token,
        (getCurrentTimestamp() + expires_in) * 1000,
      );
      return access_token;
    } catch (e) {
      throw new UnAuthenticatedError(e.toJSON());
    }
  };

  async function getOrRefreshAccessToken() {
    const CLOCK_TOLERANCE = 60 * 1000; // 1 minute
    const currentTime = Date.now() - CLOCK_TOLERANCE;
    if (currentTime >= tokenExpireTime) return refreshAccessToken();
    return imMemoryAccessToken!;
  }

  return {
    accessToken: imMemoryAccessToken,
    exchangeTokenFromCode,
    getOrRefreshAccessToken,
    refreshAccessToken,
  };
}

const [AuthProvider, useAuthContext] = constate(useAuth);

export { AuthProvider, useAuthContext };
