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
  refreshToken?: string;
}

export const TestAuthProvider = ({
  accessToken = process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN,
  refreshToken,
  children,
}: TestAuthProviderProps) => (
  <AuthProvider accessToken={accessToken} refreshToken={refreshToken}>
    {children}
  </AuthProvider>
);
