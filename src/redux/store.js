import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import { Router, Route, browserHistory } from 'react-router';

import reducer from './modules/reducer';

let finalCreateStore = compose(
  applyMiddleware(logger()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState = {}) {
return finalCreateStore(
  reducer,
  initialState);
}
