import React from 'react';
import { render } from 'react-dom';
import { App } from './components/index';
import { Provider } from 'react-redux';
import store from './store';
import './styles/index.scss';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
