import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { loginRedirect } from './utils/loginRedirect';

export function Login() {
  const location = useLocation<Record<string, unknown>>();

  useEffect(() => {
    loginRedirect(location.state);
  }, [location]);
  return <div data-testid="login-empty" />;
}
