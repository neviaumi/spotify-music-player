import axios, { AxiosError } from 'axios';
import { identity } from 'ramda';
import * as rax from 'retry-axios';

export function createSpotifyAPIClient(
  accessToken: string,
  refreshTokenFunction: () => Promise<string>,
) {
  const client = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  client.defaults.raxConfig = {
    instance: client,
    onRetryAttempt: async err => {
      const { config: requestConfig } = err;
      try {
        const accessTokenAfterRefresh = await refreshTokenFunction();
        err.config.headers = {
          ...requestConfig.headers,
          Authorization: `Bearer ${accessTokenAfterRefresh}`,
        };
      } catch (e) {
        if (err.config.raxConfig?.currentRetryAttempt)
          err.config.raxConfig.currentRetryAttempt = Number.POSITIVE_INFINITY; // disable retry next time
      }
    },
    statusCodesToRetry: [
      [401, 401],
      [429, 429],
      [501, 599],
    ],
  };
  rax.attach(client);
  client.interceptors.response.use(identity, (err: AxiosError) => {
    const { config, response } = err;
    err.message = `
Axios Error - ${err.message}
Request to ${config.method?.toUpperCase()} ${config.baseURL}/${config.url}
Response Code : ${response?.status}
Response Body: 
${JSON.stringify(response?.data, null, 4)} 
`;
    Error.captureStackTrace(err);
    return Promise.reject(err);
  });
  return client;
}

export function createSpotifyAPIClientForTesting() {
  const accessToken = import.meta.env
    .SNOWPACK_PUBLIC_SPOTIFY_ACCESS_TOKEN as string;
  return createSpotifyAPIClient(accessToken, () =>
    Promise.resolve(accessToken),
  );
}
