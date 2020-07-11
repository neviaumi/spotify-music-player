import React from 'react';

import AuthProvider, {
  TestAuthProvider,
  TestAuthProviderProps,
} from './contexts/Auth';
import SWRConfigProvider, {
  SWRConfigProviderProps as TestSWRConfigProviderProps,
  TestSWRConfigProvider,
} from './contexts/SWR';
import ThemeProvider from './contexts/Theme';
import Router from './Router';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SWRConfigProvider>
          <Router />
        </SWRConfigProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export function TestApp({
  AuthProviderProps,
  SWRConfigProviderProps,
  children,
}: {
  AuthProviderProps?: TestAuthProviderProps;
  SWRConfigProviderProps?: TestSWRConfigProviderProps;
  children: React.ReactNode;
}) {
  return (
    <TestAuthProvider {...AuthProviderProps}>
      <TestSWRConfigProvider {...SWRConfigProviderProps}>
        <ThemeProvider>{children}</ThemeProvider>
      </TestSWRConfigProvider>
    </TestAuthProvider>
  );
}

export default App;
