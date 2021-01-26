import { Route, Switch } from 'react-router-dom';
import { useAsync } from 'react-use';

import { Nav } from '../components/Nav';
import { Panel } from '../components/Panel';
import { useAuthContext } from '../contexts/Auth/AuthContext';
import { Suggestion } from '../pages/index';
import { PlayerListPage } from '../pages/playlist/:playListId';

export function ContentSwitch() {
  return (
    <Switch>
      <Route component={Suggestion} exact path="/" />
      <Route component={PlayerListPage} exact path="/playlist/:playListId" />
    </Switch>
  );
}

export function ProtectedRoutes() {
  const { refreshAccessToken, accessToken } = useAuthContext();
  const { loading, error } = useAsync(async () => {
    if (!accessToken) await refreshAccessToken();
    return;
  });
  if (loading) return null;
  if (error) throw error;
  return (
    <Panel
      Bottom={<div>TODO!</div>}
      Left={<Nav />}
      Right={<ContentSwitch />}
      data-testid="panel"
    />
  );
}
