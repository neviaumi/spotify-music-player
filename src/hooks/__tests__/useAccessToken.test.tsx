import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import AuthContextProvider from '../../contexts/Auth/AuthContextProvider';
import AuthenticationExpiredError from '../../errors/AuthenticationExpiredError';
import UnAuthenticatedError from '../../errors/UnAuthenticatedError';
import useAccessToken from '../useAccessToken';

jest.unmock('../useAccessToken');

function DummyComponentWillGetToken() {
  const { getAccessInfo } = useAccessToken();
  const token = getAccessInfo();
  return <div data-testid="access-token">{token}</div>;
}

function DummyComponentWillSetToken() {
  const { setAccessInfo, getAccessInfo } = useAccessToken();
  setAccessInfo({
    token: 'foobar',
    expiredAt: Number.POSITIVE_INFINITY,
  });
  const token = getAccessInfo();
  return <div data-testid="access-token">{token}</div>;
}

describe('Test useAccessToken setAccessToken hooks', () => {
  it('Should success set the token', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <AuthContextProvider>
          <DummyComponentWillSetToken />
        </AuthContextProvider>
      </MemoryRouter>,
    );
    expect(getByTestId('access-token').textContent).toEqual('foobar');
  });
});
describe('Test useAccessToken getAccessToken hooks', () => {
  it('Should success get the token', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <AuthContextProvider
          isAuthenticated
          _accessInfo={{
            token: 'foobar',
            expiredAt: Number.POSITIVE_INFINITY,
          }}
        >
          <DummyComponentWillGetToken />
        </AuthContextProvider>
      </MemoryRouter>,
    );
    expect(getByTestId('access-token').textContent).toEqual('foobar');
  });

  it('Should fail get the token due to unauthenticated', () => {
    expect(() =>
      render(
        <MemoryRouter initialEntries={['/']}>
          <AuthContextProvider>
            <DummyComponentWillGetToken />
          </AuthContextProvider>
        </MemoryRouter>,
      ),
    ).toThrow(UnAuthenticatedError);
  });

  it('Should fail get the token due to token expired', () => {
    expect(() =>
      render(
        <MemoryRouter initialEntries={['/']}>
          <AuthContextProvider
            isAuthenticated
            _accessInfo={{
              token: 'foobar',
              expiredAt: 0,
            }}
          >
            <DummyComponentWillGetToken />
          </AuthContextProvider>
        </MemoryRouter>,
      ),
    ).toThrow(AuthenticationExpiredError);
  });
});
