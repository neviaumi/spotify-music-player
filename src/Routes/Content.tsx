import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Nav from '../components/Nav';
import Panel from '../components/Panel';
import Suggestion from '../pages/Suggestion';

export function ContentSwitch() {
  return (
    <Switch>
      <Route exact path="/" component={Suggestion} />
      <Route exact path="/playlist/:id" render={() => <div>TODO</div>} />
    </Switch>
  );
}

export default function Content() {
  return (
    <Panel
      data-testid="panel"
      Left={<Nav />}
      Right={<ContentSwitch />}
      Bottom={<div>TODO!</div>}
    />
  );
}
