import { render } from '@testing-library/react';
import React from 'react';

import AuthContextProvider from '../../contexts/Auth/AuthContextProvider';
import useAccessToken from '../useAccessToken';

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
      <AuthContextProvider>
        <DummyComponentWillSetToken />
      </AuthContextProvider>,
    );
    expect(getByTestId('access-token').textContent).toEqual('foobar');
  });
});
describe('Test useAccessToken getAccessToken hooks', () => {
  it('Should success get the token', () => {
    const { getByTestId } = render(
      <AuthContextProvider
        isAuthenticated
        _accessInfo={{
          token: 'foobar',
          expiredAt: Number.POSITIVE_INFINITY,
        }}
      >
        <DummyComponentWillGetToken />
      </AuthContextProvider>,
    );
    expect(getByTestId('access-token').textContent).toEqual('foobar');
  });

  it('Should fail get the token due to unauthenticated', () => {
    expect(() =>
      render(
        <AuthContextProvider>
          <DummyComponentWillGetToken />
        </AuthContextProvider>,
      ),
    ).toThrow('Custom Error here');
  });

  it('Should fail get the token due to token expired', () => {
    expect(() =>
      render(
        <AuthContextProvider
          isAuthenticated
          _accessInfo={{
            token: 'foobar',
            expiredAt: 0,
          }}
        >
          <DummyComponentWillGetToken />
        </AuthContextProvider>,
      ),
    ).toThrow('Custom Error here');
  });
});
