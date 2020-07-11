import React from 'react';

import AuthContextProvider from './contexts/Auth/AuthContextProvider';
import SWRConfigProvider from './contexts/SWR';
import ThemeProvider from './contexts/Theme';
import Router from './Router';

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <SWRConfigProvider>
          <Router />
        </SWRConfigProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
