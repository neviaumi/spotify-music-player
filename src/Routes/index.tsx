import { Route, Switch } from 'react-router-dom';

import { AuthErrorBoundary } from '../components/ErrorBoundary/Auth';
import { Nav } from '../components/Nav';
import { Panel } from '../components/Panel';
import { AlbumPage } from '../pages/album/:albumId';
import { LoginPage } from '../pages/auth/login';
import { LoginCallbackPage } from '../pages/auth/login/callback';
import { Suggestion } from '../pages/index';
import { PlayerListPage } from '../pages/playlist/:playListId';
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
        <ProtectedRoutes>
          <Panel
            Bottom={<div>TODO!</div>}
            Left={<Nav />}
            Right={
              <Switch>
                <Route component={Suggestion} exact path="/" />
                <Route
                  component={PlayerListPage}
                  exact
                  path="/playlist/:playListId"
                />
                <Route component={AlbumPage} exact path="/album/:albumId" />
              </Switch>
            }
            data-testid="panel"
          />
        </ProtectedRoutes>
      </AuthErrorBoundary>
    </Switch>
  );
}
