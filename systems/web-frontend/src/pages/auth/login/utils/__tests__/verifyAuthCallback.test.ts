import {
  beforeEach,
  expect,
  it,
} from '../../../../../../testHelper/test-runner';
import { AuthenticationCallbackError } from '../../../../../errors/AuthenticationCallbackError';
import { verifyAuthCallback } from '../verifyAuthCallback';

beforeEach(() => window.localStorage.clear());

it('Read previous state', () => {
  window.localStorage.setItem('randomIdHere', JSON.stringify({ foo: 'bar' }));
  const authorizeUrl = new URL('http://localhost:3000/auth/callback');
  const searchParams = authorizeUrl.searchParams;
  searchParams.append('code', 'foobar');
  searchParams.append('state', 'randomIdHere');
  searchParams.append('xyz', 'www');
  const params = verifyAuthCallback(authorizeUrl.toString());
  expect(params).toEqual({
    code: 'foobar',
    state: { foo: 'bar' },
  });
  expect(window.localStorage.getItem('randomIdHere')).toBeNull();
});

it('error if state not found', () => {
  expect(window.localStorage.getItem('randomIdHere')).toBeNull();
  const authorizeUrl = new URL('http://localhost:3000/auth/callback');
  const searchParams = authorizeUrl.searchParams;
  searchParams.append('access_token', 'foobar');
  searchParams.append('token_type', 'Bearer');
  searchParams.append('expires_in', '3600');
  searchParams.append('state', 'randomThingHere');
  searchParams.append('xyz', 'www');
  expect(() => verifyAuthCallback(authorizeUrl.toString())).toThrow(
    AuthenticationCallbackError,
  );
});

it('error if given url has error', () => {
  const authorizeUrl = new URL(
    'http://localhost:3000/auth/callback?error=unit-test&state=foobar&dummy=i-am-a-teapot',
  );

  expect(() => verifyAuthCallback(authorizeUrl.toString())).toThrow(
    AuthenticationCallbackError,
  );
});
