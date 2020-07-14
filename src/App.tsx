import React from 'react';
import { MemoryRouterProps } from 'react-router';
import { MemoryRouter } from 'react-router-dom';

import AuthProvider, { TestAuthProvider } from './contexts/Auth';
import DataFetchingConfigProvider, {
  DataFetchingConfigProviderProps,
  TestDataFetchingConfigProvider,
} from './contexts/DataFetching';
import ThemeProvider from './contexts/Theme';
import Router from './Router';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DataFetchingConfigProvider>
          <Router />
        </DataFetchingConfigProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export function TestApp({
  DataFetchingConfigProviderProps: _DataFetchingConfigProviderProps,
  MemoryRouterProps: _MemoryRouterProps,
  children,
}: {
  DataFetchingConfigProviderProps?: DataFetchingConfigProviderProps;
  MemoryRouterProps?: MemoryRouterProps;
  children: React.ReactNode;
}) {
  return (
    <MemoryRouter {..._MemoryRouterProps}>
      <TestAuthProvider>
        <TestDataFetchingConfigProvider {..._DataFetchingConfigProviderProps}>
          <ThemeProvider>{children}</ThemeProvider>
        </TestDataFetchingConfigProvider>
      </TestAuthProvider>
    </MemoryRouter>
  );
}

export default App;
