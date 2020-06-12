import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Home, FileLoaded } from './client/views/index';

// setup browser router for url routing
const Routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/fileLoaded" component={FileLoaded} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
