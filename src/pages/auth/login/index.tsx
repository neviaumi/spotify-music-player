import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import authorize from '../../../services/spotify/auth/authorize';

export function Login() {
  const location = useLocation<Record<string, unknown>>();

  useEffect(() => authorize(location.state), [location]);
  return <div data-testid="login-empty" />;
}
