import React from 'react';
import { Redirect } from 'react-router-dom';

import useAccessToken from '../../../hooks/useAccessToken';
import verifyAuthCallback from '../../../services/spotify/auth/verifyAuthCallback';

export default function AuthCallback() {
  const { setAccessInfo } = useAccessToken();
  const authResult = verifyAuthCallback(window.location.href);
  setAccessInfo(authResult);
  return <Redirect to="/" />;
}
