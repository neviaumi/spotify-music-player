import nanoid from 'nanoid';
import { URL } from 'url';

import openidConfiguration from '../../../../../config/openidConfiguration';
import { getAuthorizeUrl, loginRedirect } from '../loginRedirect';

jest.mock('nanoid');

describe('getAuthorizeUrl', () => {
  it('Should return authorization url', () => {
    const url = getAuthorizeUrl('foobar', 'codeChallenge');
    const authorizeUrl = new URL(openidConfiguration.authorization_endpoint);
    const queryParams = authorizeUrl.searchParams;
    queryParams.append(
      'client_id',
      process.env.REACT_APP_SPOTIFY_CLIENT_ID as string,
    );
    queryParams.append('scope', openidConfiguration.scopes_supported.join(' '));
    queryParams.append('response_type', openidConfiguration.response_types[0]);
    queryParams.append('redirect_uri', openidConfiguration.redirect_uris[0]);
    queryParams.append('code_challenge_method', 'S256');
    queryParams.append('code_challenge', 'codeChallenge');
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
  beforeEach(() => window.localStorage.clear());

  it('redirect user to url', async () => {
    // @ts-expect-error
    nanoid.mockReturnValue('randomId');
    const redirectUrl = await loginRedirect({
      location: 'https://www.google.com',
    });
    expect(window.location.replace).toHaveBeenCalledWith(redirectUrl);
    expect(window.localStorage.getItem('randomId')).toBeDefined();
  });
});
