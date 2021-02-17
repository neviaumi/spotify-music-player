import { createMemoryHistory } from 'history';
import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { RouterProps } from 'react-router';
import { BrowserRouter, Router } from 'react-router-dom';

import { ErrorFallback } from './components/ErrorFallback';
import { Suspense } from './components/Suspense/withSuspense';
import {
  AuthContextProvider,
  TestAuthProvider,
  TestAuthProviderProps,
} from './contexts/Auth';
import {
  DataFetchingConfigProvider,
  DataFetchingConfigProviderProps,
  TestDataFetchingConfigProvider,
} from './contexts/DataFetching';
import {
  PlayerState,
  SpotifyWebPlaybackProps,
  SpotifyWebPlaybackProvider,
} from './contexts/SpotifyWebPlayback';
import { player } from './contexts/SpotifyWebPlayback/testHelpers/mockPlayer';
import { AppThemeProvider } from './contexts/Theme';
import { Routes } from './Routes';

export function App() {
  return (
    <AppThemeProvider>
      <DataFetchingConfigProvider>
        <BrowserRouter>
          <AuthContextProvider>
            <Routes />
          </AuthContextProvider>
        </BrowserRouter>
      </DataFetchingConfigProvider>
    </AppThemeProvider>
  );
}

export function TestApp({
  AuthProviderProps: _TestAuthProviderProps,
  DataFetchingConfigProviderProps: _DataFetchingConfigProviderProps,
  RouterProps: _RouterProps,
  SpotifyWebPlaybackProps: _SpotifyWebPlaybackProps,
  children,
}: {
  AuthProviderProps?: TestAuthProviderProps;
  DataFetchingConfigProviderProps?: DataFetchingConfigProviderProps;
  RouterProps?: RouterProps;
  SpotifyWebPlaybackProps?: SpotifyWebPlaybackProps;
  children: ReactNode;
}) {
  return (
    <AppThemeProvider>
      <TestDataFetchingConfigProvider {..._DataFetchingConfigProviderProps}>
        <Router
          {...(_RouterProps ?? {
            history: createMemoryHistory(),
          })}
        >
          <TestAuthProvider {..._TestAuthProviderProps}>
            <SpotifyWebPlaybackProvider
              {...(_SpotifyWebPlaybackProps ?? {
                currentState: PlayerState.PAUSED,
                player,
              })}
            >
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense>{children}</Suspense>
              </ErrorBoundary>
            </SpotifyWebPlaybackProvider>
          </TestAuthProvider>
        </Router>
      </TestDataFetchingConfigProvider>
    </AppThemeProvider>
  );
}
