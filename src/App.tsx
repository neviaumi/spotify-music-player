import { createMemoryHistory } from 'history';
import type { ReactNode } from 'react';
import type { RouterProps } from 'react-router';
import { BrowserRouter, Router } from 'react-router-dom';

import {
  AuthContextProvider,
  TestAuthProvider,
  TestAuthProviderProps,
} from './contexts/Auth';
import DataFetchingConfigProvider, {
  DataFetchingConfigProviderProps,
  TestDataFetchingConfigProvider,
} from './contexts/DataFetching';
import ThemeProvider from './contexts/Theme';
import Routes from './Routes';

function App() {
  return (
    <ThemeProvider>
      <DataFetchingConfigProvider>
        <BrowserRouter>
          <AuthContextProvider>
            <Routes />
          </AuthContextProvider>
        </BrowserRouter>
      </DataFetchingConfigProvider>
    </ThemeProvider>
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
    <ThemeProvider>
      <TestDataFetchingConfigProvider {..._DataFetchingConfigProviderProps}>
        <Router
          {...(_RouterProps ?? {
            history: createMemoryHistory(),
          })}
        >
          <TestAuthProvider {..._TestAuthProviderProps}>
            {children}
          </TestAuthProvider>
        </Router>
      </TestDataFetchingConfigProvider>
    </ThemeProvider>
  );
}

export default App;
