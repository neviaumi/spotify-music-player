import { useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { useAsync } from 'react-use';

import { useAuthContext } from '../../../../contexts/Auth/AuthContext';
import verifyAuthCallback from '../utils/verifyAuthCallback';

export default function AuthCallback() {
  const { exchangeTokenFromCode } = useAuthContext();
  const {
    state: { codeVerifier, from },
    code,
  } = useMemo(() => verifyAuthCallback(window.location.href), []);
  const { loading, error } = useAsync(
    async () => exchangeTokenFromCode(code, codeVerifier),
    [code, codeVerifier],
  );
  if (loading) return null;
  if (error) throw error;

  return (
    <Redirect
      to={{
        pathname: from?.pathname || '/',
        state: { from: from },
      }}
    />
  );
}
