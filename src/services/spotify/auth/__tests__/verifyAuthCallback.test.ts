import { URL, URLSearchParams } from 'url';

import AuthenticationCallbackError from '../../../../errors/AuthenticationCallbackError';
import getCurrentTimestamp from '../../../../utils/getCurrentTimestamp';
import Storage from '../../../storage';
import verifyAuthCallback from '../verifyAuthCallback';

jest.mock('../../../../utils/getCurrentTimestamp');
jest.mock('../../../storage');

const getCurrentTimestampMock = getCurrentTimestamp as jest.Mock;

it('Read previous state from cookies', () => {
  getCurrentTimestampMock.mockReturnValue(3600);
  const getItemSpy = jest
    .spyOn(Storage, 'getItem')
    .mockReturnValue('{"foo": "bar"}');
  const authorizeUrl = new URL('http://localhost:3000/auth/callback');
  const hashParams = new URLSearchParams();
  hashParams.append('access_token', 'foobar');
  hashParams.append('token_type', 'Bearer');
  hashParams.append('expires_in', '3600');
  hashParams.append('state', 'randomThingHere');
  hashParams.append('xyz', 'www');
  authorizeUrl.hash = hashParams.toString();
  const params = verifyAuthCallback(authorizeUrl.toString());
  expect(params).toEqual({
    expiredAt: 7200,
    state: { foo: 'bar' },
    token: 'foobar',
  });
  getItemSpy.mockRestore();
});

it('Should return valid callback params from url', () => {
  getCurrentTimestampMock.mockReturnValue(3600);
  const authorizeUrl = new URL('http://localhost:3000/auth/callback');
  const hashParams = new URLSearchParams();
  hashParams.append('access_token', 'foobar');
  hashParams.append('token_type', 'Bearer');
  hashParams.append('expires_in', '3600');
  hashParams.append('state', 'randomThingHere');
  hashParams.append('xyz', 'www');
  authorizeUrl.hash = hashParams.toString();
  const params = verifyAuthCallback(authorizeUrl.toString());
  expect(params).toEqual({
    expiredAt: 7200,
    state: {},
    token: 'foobar',
  });
});

it('Should return error params from url', () => {
  const authorizeUrl = new URL(
    'http://localhost:3000/auth/callback?error=unit-test&state=foobar&dummy=i-am-a-teapot',
  );

  expect(() => verifyAuthCallback(authorizeUrl.toString())).toThrow(
    AuthenticationCallbackError,
  );
});
