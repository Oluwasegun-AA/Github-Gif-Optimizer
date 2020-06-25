import React from 'react';
import { Route, MemoryRouter, Switch } from 'react-router-dom';
import { Home } from './client/views/index';

// setup browser router for url routing
const Routes = (
  <MemoryRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </MemoryRouter>
);

export default Routes;
