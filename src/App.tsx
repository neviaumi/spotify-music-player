import React from 'react';

import AuthContextProvider from './contexts/Auth/AuthContextProvider';
import ThemeProvider from './contexts/Theme';
import Router from './Router';

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
