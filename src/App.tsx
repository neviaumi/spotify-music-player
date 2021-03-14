import { createMemoryHistory } from 'history';
import type { ReactNode } from 'react';
import type { RouterProps } from 'react-router';
import { BrowserRouter, Router } from 'react-router-dom';

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
import { SpotifyWebPlaybackProvider } from './contexts/SpotifyWebPlayback';
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
  children,
}: {
  AuthProviderProps?: TestAuthProviderProps;
  DataFetchingConfigProviderProps?: DataFetchingConfigProviderProps;
  RouterProps?: RouterProps;
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
            <SpotifyWebPlaybackProvider>
              <Suspense>{children}</Suspense>
            </SpotifyWebPlaybackProvider>
          </TestAuthProvider>
        </Router>
      </TestDataFetchingConfigProvider>
    </AppThemeProvider>
  );
}
