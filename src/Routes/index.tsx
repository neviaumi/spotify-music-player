import { Route, Switch } from 'react-router-dom';

import { AuthErrorBoundary } from '../components/ErrorBoundary/Auth';
import { DataFetchingErrorBoundary } from '../components/ErrorBoundary/DataFetching';
import { LoginPage } from '../pages/auth/login';
import { LoginCallbackPage } from '../pages/auth/login/callback';
import { ProtectedRoutes } from './ProtectedRoutes';

export function DummyComponent() {
  return <div>First Content</div>;
}

export function Routes() {
  return (
    <Switch>
      <Route component={LoginPage} exact path="/auth/login" />
      <Route component={LoginCallbackPage} exact path="/auth/login/callback" />
      <Route component={DummyComponent} exact path="/metric/performance" />
      <AuthErrorBoundary>
        <DataFetchingErrorBoundary>
          <ProtectedRoutes />
        </DataFetchingErrorBoundary>
      </AuthErrorBoundary>
    </Switch>
  );
}
