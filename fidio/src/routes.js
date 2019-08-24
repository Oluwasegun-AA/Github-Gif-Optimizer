import React from 'react';
import {
  Route,
  BrowserRouter,
  Switch
} from 'react-router-dom';
import Test from './views/index';

const Routes = (
  <BrowserRouter>
  <Switch>
  <Route exact path="/" component={Test} />
  </Switch>
  </BrowserRouter>
);

export default Routes;