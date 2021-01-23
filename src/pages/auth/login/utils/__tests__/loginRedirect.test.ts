import nanoid from 'nanoid';
import { URL } from 'url';

import { getAuthorizeUrl, loginRedirect } from '../loginRedirect';
import openidConfiguration from '../openidConfiguration';

jest.mock('nanoid');

describe('getAuthorizeUrl', () => {
  it('Should return authorization url', () => {
    const url = getAuthorizeUrl('foobar');
    const authorizeUrl = new URL(openidConfiguration.authorization_endpoint);
    const queryParams = authorizeUrl.searchParams;
    queryParams.append(
      'client_id',
      process.env.REACT_APP_SPOTIFY_CLIENT_ID as string,
    );
    queryParams.append(
      'scope',
      [
        'playlist-read-private',
        'playlist-read-collaborative',
        'user-read-recently-played',
        'user-top-read',
      ].join(' '),
    );
    queryParams.append('response_type', openidConfiguration.response_types[0]);
    queryParams.append('redirect_uri', openidConfiguration.redirect_uris[0]);
    queryParams.append('show_dialog', 'false');
    queryParams.append('state', 'foobar');
    expect(url).toEqual(authorizeUrl.toString());
  });
});

describe('loginRedirect', () => {
  beforeAll(() => {
    const orgWindowLocation = window.location;
    // @ts-expect-error
    delete window.location;
    Object.assign(window, {
      location: {
        ...orgWindowLocation,
        replace: jest.fn().mockReturnValue(undefined),
      },
    });
  });
  it('redirect user to url', () => {
    // @ts-expect-error
    nanoid.mockReturnValue('randomId');
    const redirectUrl = getAuthorizeUrl('randomId');
    loginRedirect({
      location: 'https://www.google.com',
    });
    expect(window.location.replace).toHaveBeenCalledWith(redirectUrl);
    expect(window.localStorage.getItem('randomId')).toEqual(
      JSON.stringify({
        location: 'https://www.google.com',
      }),
    );
  });
});
