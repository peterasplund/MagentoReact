import React from 'react';
import { render } from 'react-dom';
import configureStore from '../src/redux/store';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router } from 'react-router';
import ApiClient from '../src/helpers/ApiClient';
import getRoutes from '../src/routes';

const client = new ApiClient();
const store = configureStore(browserHistory, client);

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      {getRoutes(store)}
    </Router>
  </Provider>,
  document.getElementById('app')
)
