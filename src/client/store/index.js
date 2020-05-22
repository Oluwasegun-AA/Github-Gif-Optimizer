/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/**
 * Redux Thunk allows calling action creators that return a function
 * instead of an action object
 */
const devTools = [
  applyMiddleware(thunk),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__
    ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
    : []),
];

// setup redux store
const store = createStore(rootReducer, compose(...devTools));

export default store;
