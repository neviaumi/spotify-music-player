import type { PropsWithChildren } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useAsync } from 'react-use';

import { useAuthContext } from '../contexts/Auth/AuthContext';

export function ProtectedRoutes({ children }: PropsWithChildren<unknown>) {
  const { refreshAccessToken, accessToken } = useAuthContext();
  const location = useLocation();
  const { loading, error } = useAsync(async () => {
    if (!accessToken) await refreshAccessToken();
    return;
  });
  if (loading) return <></>;
  if (error)
    return (
      <Redirect
        to={{
          pathname: '/auth/login',
          state: {
            from: location,
          },
        }}
      />
    );
  return <>{children}</>;
}
