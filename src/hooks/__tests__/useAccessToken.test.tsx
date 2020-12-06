import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import AuthContextProvider from '../../contexts/Auth';
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
    expiredAt: Number.POSITIVE_INFINITY,
    token: 'foobar',
  });
  const token = getAccessInfo();
  return <div data-testid="access-token">{token}</div>;
}

describe('Test useAccessToken setAccessToken hooks', () => {
  it('Should success set the token', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthContextProvider>
          <DummyComponentWillSetToken />
        </AuthContextProvider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId('access-token').textContent).toEqual('foobar');
  });
});
describe('Test useAccessToken getAccessToken hooks', () => {
  it('Should success get the token', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthContextProvider
          _accessInfo={{
            expiredAt: Number.POSITIVE_INFINITY,
            token: 'foobar',
          }}
          isAuthenticated
        >
          <DummyComponentWillGetToken />
        </AuthContextProvider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId('access-token').textContent).toEqual('foobar');
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
            _accessInfo={{
              expiredAt: 0,
              token: 'foobar',
            }}
            isAuthenticated
          >
            <DummyComponentWillGetToken />
          </AuthContextProvider>
        </MemoryRouter>,
      ),
    ).toThrow(AuthenticationExpiredError);
  });
});
