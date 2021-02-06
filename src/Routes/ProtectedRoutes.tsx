import type { PropsWithChildren } from 'react';
import { useAsync } from 'react-use';

import { useAuthContext } from '../contexts/Auth/AuthContext';

export function ProtectedRoutes({ children }: PropsWithChildren<unknown>) {
  const { refreshAccessToken, accessToken } = useAuthContext();
  const { loading, error } = useAsync(async () => {
    if (!accessToken) await refreshAccessToken();
    return;
  });
  if (loading) return <></>;
  if (error) throw error;
  return <>{children}</>;
}
