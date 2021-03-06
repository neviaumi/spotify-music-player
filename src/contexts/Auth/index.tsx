import type { ReactNode } from 'react';

import { AuthProvider } from './AuthContext';

interface Props {
  children: ReactNode;
}

export function AuthContextProvider({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}

export interface TestAuthProviderProps {
  accessToken?: string;
  children?: ReactNode;
  tokenExpireTime?: number;
}

export const TestAuthProvider = ({
  accessToken = process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN,
  tokenExpireTime,
  children,
}: TestAuthProviderProps) => {
  return (
    <AuthProvider accessToken={accessToken} tokenExpireTime={tokenExpireTime}>
      {children}
    </AuthProvider>
  );
};
