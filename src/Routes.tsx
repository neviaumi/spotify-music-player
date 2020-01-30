import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthCallback from './pages/Auth/Callback';
import Login from './pages/Auth/Login';
import Home from './pages/Home';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/login/callback" component={AuthCallback} />
    </Switch>
  );
}
