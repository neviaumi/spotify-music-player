import { Route, Switch } from 'react-router-dom';

import { MusicPlayback } from '../components/MusicPlayback';
import { Nav } from '../components/Nav';
import { Panel } from '../components/Panel';
import { SpotifyWebPlaybackProvider } from '../contexts/SpotifyWebPlayback';
import { AlbumPage } from '../pages/album/:albumId';
import { LoginPage } from '../pages/auth/login';
import { LoginCallbackPage } from '../pages/auth/login/callback';
import { Suggestion } from '../pages/index';
import { PlaylistPage } from '../pages/playlist/:playlistId';
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
      <ProtectedRoutes>
        <SpotifyWebPlaybackProvider>
          <Panel
            Bottom={<MusicPlayback />}
            Left={<Nav />}
            Right={
              <Switch>
                <Route component={Suggestion} exact path="/" />
                <Route
                  component={PlaylistPage}
                  exact
                  path="/playlist/:playlistId"
                />
                <Route component={AlbumPage} exact path="/album/:albumId" />
              </Switch>
            }
            data-testid="panel"
          />
        </SpotifyWebPlaybackProvider>
      </ProtectedRoutes>
    </Switch>
  );
}
