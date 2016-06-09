import React from 'react';
import { render } from 'react-dom';
import configureStore from '../src/redux/store';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Routes from '../src/routes';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('app')
)
