import React from 'react';

import AuthProvider, {
  TestAuthProvider,
  TestAuthProviderProps,
} from './contexts/Auth';
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
  AuthProviderProps,
  DataFetchingConfigProviderProps: _DataFetchingConfigProviderProps,
  children,
}: {
  AuthProviderProps?: TestAuthProviderProps;
  DataFetchingConfigProviderProps?: DataFetchingConfigProviderProps;
  children: React.ReactNode;
}) {
  return (
    <TestAuthProvider {...AuthProviderProps}>
      <TestDataFetchingConfigProvider {..._DataFetchingConfigProviderProps}>
        <ThemeProvider>{children}</ThemeProvider>
      </TestDataFetchingConfigProvider>
    </TestAuthProvider>
  );
}

export default App;
