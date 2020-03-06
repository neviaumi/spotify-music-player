import axios from 'axios';

import createSpotifyAPIClient from '../createSpotifyAPIClient';

describe('Test create API Client', () => {
  it('Should create client', () => {
    const createSpy = jest.spyOn(axios, 'create').mockReturnValue({} as any);
    createSpotifyAPIClient('Spotify Access Token here');
    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://api.spotify.com/v1',
      headers: {
        Authorization: 'Bearer Spotify Access Token here',
      },
    });
  });
});
