import { applyMiddleware, compose, createStore } from 'redux';
import createMiddleware from './middleware/clientMiddleware';

import reducer from './modules/reducer';


export default function configureStore(browserHistory, client, initialState = {}) {
  const finalCreateStore = compose(
    applyMiddleware(createMiddleware(client)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  return finalCreateStore(
    reducer,
    initialState
  );
}
