import type { ReactNode } from 'react';

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
    _accessInfo: _accessInfo,
    isAuthenticated: isAuthenticated || false,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

interface TestAuthProviderProps {
  children?: ReactNode;
}

export const TestAuthProvider = ({ children }: TestAuthProviderProps) => (
  <AuthContext.Provider
    value={{
      _accessInfo: {
        expiredAt: Number.MAX_SAFE_INTEGER,
        token: process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN as string,
      },
      isAuthenticated: true,
    }}
  >
    {children}
  </AuthContext.Provider>
);
