import { createSpotifyAPIClient } from '../createSpotifyAPIClient';

describe('Test create API Client', () => {
  it('Should create client', () => {
    const apiClient = createSpotifyAPIClient('Spotify Access Token here', () =>
      Promise.resolve(''),
    );
    expect(apiClient.defaults.baseURL).toEqual('https://api.spotify.com/v1');
    expect(apiClient.defaults.headers.Authorization).toEqual(
      'Bearer Spotify Access Token here',
    );
    expect(apiClient.defaults).toHaveProperty('raxConfig');
  });
});
