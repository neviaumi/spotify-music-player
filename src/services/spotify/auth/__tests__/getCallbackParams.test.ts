import { URL, URLSearchParams } from 'url';

import getCallbackParams from '../getCallbackParams';

it('Should return valid callback params from url', () => {
  const authorizeUrl = new URL('http://localhost:3000/auth/callback');
  const hashParams = new URLSearchParams();
  hashParams.append('access_token', 'foobar');
  hashParams.append('token_type', 'Bearer');
  hashParams.append('expires_in', '-1');
  hashParams.append('state', 'randomThingHere');
  hashParams.append('xyz', 'www');
  authorizeUrl.hash = hashParams.toString();
  const params = getCallbackParams(authorizeUrl.toString());
  expect(params).toEqual({
    access_token: 'foobar',
    error: null,
    expires_in: '-1',
    state: 'randomThingHere',
    token_type: 'Bearer',
  });
});

it('Should return error params from url', () => {
  const authorizeUrl = new URL(
    'http://localhost:3000/auth/callback?error=unit-test&state=foobar&dummy=i-am-a-teapot',
  );

  const params = getCallbackParams(authorizeUrl.toString());
  expect(params).toEqual({
    access_token: null,
    error: 'unit-test',
    expires_in: null,
    state: 'foobar',
    token_type: null,
  });
});
