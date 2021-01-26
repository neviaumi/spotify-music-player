import axios from 'axios';
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
    noResponseRetries: 0,
    onRetryAttempt: async err => {
      const { config: requestConfig } = err;
      const accessTokenAfterRefresh = await refreshTokenFunction();
      err.config.headers = {
        ...requestConfig.headers,
        Authorization: `Bearer ${accessTokenAfterRefresh}`,
      };
    },
    statusCodesToRetry: [[401, 401]],
  };
  rax.attach(client);
  return client;
}

export function createSpotifyAPIClientForTesting() {
  const accessToken = process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN as string;
  return createSpotifyAPIClient(accessToken, () =>
    Promise.resolve(accessToken),
  );
}
