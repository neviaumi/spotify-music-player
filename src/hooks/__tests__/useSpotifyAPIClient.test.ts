import axios from 'axios';

import useSpotifyAPIClient from '../useSpotifyAPIClient';

jest.mock('../useAccessToken');

describe('Test API Client hook', () => {
  it('Should create client', () => {
    const createSpy = jest.spyOn(axios, 'create').mockReturnValue({} as any);
    useSpotifyAPIClient();
    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://api.spotify.com/v1',
      headers: {
        Authorization: 'Bearer Spotify Access Token here',
      },
    });
  });
});
