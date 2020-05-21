import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import { App } from './client/components/index';
import store from './client/store';
import './client/styles/index.scss';

/**
 * setup React elements to be rendered within the HTML element with id = root
 * setup Redux store as a parent prop to the application
 */
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
