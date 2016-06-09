import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import createMiddleware from './middleware/clientMiddleware';

import reducer from './modules/reducer';



export default function configureStore(browserHistory, client, initialState = {}) {
  let finalCreateStore = compose(
    applyMiddleware(createMiddleware(client)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  return finalCreateStore(
    reducer,
    initialState
  );
}
