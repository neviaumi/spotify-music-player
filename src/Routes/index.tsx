import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthErrorBoundary from '../components/ErrorBoundary/Auth';
import DataFetchingErrorBoundary from '../components/ErrorBoundary/DataFetching';
import AuthCallback from '../pages/Auth/Callback';
import Login from '../pages/Auth/Login';
import ContentRoutes from './Content';

export function DummyComponent() {
  return <div>First Content</div>;
}

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/login/callback" component={AuthCallback} />
      <Route exact path="/metric/performance" component={DummyComponent} />
      <AuthErrorBoundary>
        <DataFetchingErrorBoundary>
          <ContentRoutes />
        </DataFetchingErrorBoundary>
      </AuthErrorBoundary>
    </Switch>
  );
}
