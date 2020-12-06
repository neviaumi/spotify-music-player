import { createMemoryHistory } from 'history';
import React from 'react';
import type { RouterProps } from 'react-router';
import { Router } from 'react-router-dom';

import AuthProvider, { TestAuthProvider } from './contexts/Auth';
import DataFetchingConfigProvider, {
  DataFetchingConfigProviderProps,
  TestDataFetchingConfigProvider,
} from './contexts/DataFetching';
import ThemeProvider from './contexts/Theme';
import AppRouter from './Router';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DataFetchingConfigProvider>
          <AppRouter />
        </DataFetchingConfigProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export function TestApp({
  DataFetchingConfigProviderProps: _DataFetchingConfigProviderProps,
  RouterProps: _RouterProps,
  children,
}: {
  DataFetchingConfigProviderProps?: DataFetchingConfigProviderProps;
  RouterProps?: RouterProps;
  children: React.ReactNode;
}) {
  return (
    <Router
      {...(_RouterProps ?? {
        history: createMemoryHistory(),
      })}
    >
      <TestAuthProvider>
        <TestDataFetchingConfigProvider {..._DataFetchingConfigProviderProps}>
          <ThemeProvider>{children}</ThemeProvider>
        </TestDataFetchingConfigProvider>
      </TestAuthProvider>
    </Router>
  );
}

export default App;
