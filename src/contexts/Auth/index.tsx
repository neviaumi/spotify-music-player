import React, { ReactNode } from 'react';

import AuthContext, { AccessInfo, AuthContextValue } from './AuthContext';

interface Props {
  _accessInfo?: AccessInfo;
  children: ReactNode;
  isAuthenticated?: boolean;
}

export default function AuthContextProvider({
  isAuthenticated,
  _accessInfo,
  children,
}: Props) {
  const contextValue: AuthContextValue = {
    isAuthenticated: isAuthenticated || false,
    _accessInfo: _accessInfo,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

interface TestAuthProviderProps {
  children?: React.ReactNode;
}

export const TestAuthProvider = ({ children }: TestAuthProviderProps) => (
  <AuthContext.Provider
    value={{
      isAuthenticated: true,
      _accessInfo: {
        token: process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN as string,
        expiredAt: Number.MAX_SAFE_INTEGER,
      },
    }}
  >
    {children}
  </AuthContext.Provider>
);
