import axios from 'axios';

import useAccessToken from '../useAccessToken';
import useSpotifyAPIClient from '../useSpotifyAPIClient';

jest.mock('../useAccessToken');

const useAccessTokenSpy = useAccessToken as TestUtils.JestMock<
  typeof useAccessToken
>;

describe('Test API Client hook', () => {
  it('Should create client', () => {
    useAccessTokenSpy.mockReturnValue({
      getAccessInfo: jest.fn().mockReturnValue('Spotify Access Token here'),
    });
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
