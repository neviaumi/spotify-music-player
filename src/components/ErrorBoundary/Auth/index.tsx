import type { PropsWithChildren } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Redirect } from 'react-router-dom';

import { UnAuthenticatedError } from '../../../errors/UnAuthenticatedError';
import { ErrorFallback } from '../../ErrorFallback';

function AuthErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error instanceof UnAuthenticatedError) {
    return (
      <Redirect
        to={{
          pathname: '/auth/login',
          state: {
            from: error.meta?.location,
          },
        }}
      />
    );
  }
  return (
    <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
  );
}

export function AuthErrorBoundary({ children }: PropsWithChildren<unknown>) {
  return (
    <ErrorBoundary FallbackComponent={AuthErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
