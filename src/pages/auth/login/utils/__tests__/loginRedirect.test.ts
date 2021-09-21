import { URL } from 'url';

import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '../../../../../../testHelper/test-runner';
import {
  authorization_endpoint,
  redirect_uris,
  response_types,
  scopes_supported,
} from '../../../../../config/openidConfiguration';
import { getAuthorizeUrl, loginRedirect } from '../loginRedirect';

describe('getAuthorizeUrl', () => {
  it('Should return authorization url', () => {
    const url = getAuthorizeUrl('foobar', 'codeChallenge');
    const authorizeUrl = new URL(authorization_endpoint);
    const queryParams = authorizeUrl.searchParams;
    queryParams.append(
      'client_id',
      import.meta.env.SNOWPACK_PUBLIC_SPOTIFY_CLIENT_ID as string,
    );
    queryParams.append('scope', scopes_supported.join(' '));
    queryParams.append('response_type', response_types[0]);
    queryParams.append('redirect_uri', redirect_uris[0]);
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
    const redirectUrl = await loginRedirect({
      location: 'https://www.google.com',
    });
    expect(window.location.replace).toHaveBeenCalledWith(redirectUrl);
    expect(
      Object.keys(window.localStorage).filter(key =>
        key.startsWith('auth-session'),
      ),
    ).toHaveLength(1);
  });
});
