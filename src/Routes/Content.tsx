import { Route, Switch } from 'react-router-dom';

import NavBar from '../components/Nav';
import Panel from '../components/Panel';
import Suggestion from '../pages/index';
import PlayListTracks from '../pages/playlist/:playListId';

export function ContentSwitch() {
  return (
    <Switch>
      <Route component={Suggestion} exact path="/" />
      <Route component={PlayListTracks} exact path="/playlist/:playListId" />
    </Switch>
  );
}

export default function Content() {
  return (
    <Panel
      Bottom={<div>TODO!</div>}
      Left={<NavBar />}
      Right={<ContentSwitch />}
      data-testid="panel"
    />
  );
}
