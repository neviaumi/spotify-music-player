import React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"

import AuthCallback from "./pages/Auth/Callback"
import Login from "./pages/Auth/Login"

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to={"/auth/login"} />} />
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/login/callback" component={AuthCallback} />
      </Switch>
    </BrowserRouter>
  )
}
