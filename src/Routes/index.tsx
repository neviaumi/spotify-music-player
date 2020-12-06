import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthErrorBoundary from '../components/ErrorBoundary/Auth';
import DataFetchingErrorBoundary from '../components/ErrorBoundary/DataFetching';
import { Login } from '../pages/Auth/Login';
import AuthCallback from '../pages/Auth/Login/callback';
import ContentRoutes from './Content';

export function DummyComponent() {
  return <div>First Content</div>;
}

export default function Routes() {
  return (
    <Switch>
      <Route component={Login} exact path="/auth/login" />
      <Route component={AuthCallback} exact path="/auth/login/callback" />
      <Route component={DummyComponent} exact path="/metric/performance" />
      <AuthErrorBoundary>
        <DataFetchingErrorBoundary>
          <ContentRoutes />
        </DataFetchingErrorBoundary>
      </AuthErrorBoundary>
    </Switch>
  );
}
