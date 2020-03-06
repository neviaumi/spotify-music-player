import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthErrorBoundary from './components/ErrorBoundary/Auth';
import DataFetchingErrorBoundary from './components/ErrorBoundary/DataFetching';
import AuthCallback from './pages/Auth/Callback';
import Login from './pages/Auth/Login';
import Home from './pages/Home';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/login/callback" component={AuthCallback} />
      <AuthErrorBoundary>
        <DataFetchingErrorBoundary>
          <Route exact path="/" component={Home} />
        </DataFetchingErrorBoundary>
      </AuthErrorBoundary>
    </Switch>
  );
}
