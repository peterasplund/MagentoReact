import React from 'react';
import { render } from 'react-dom';
import configureStore from '../src/redux/store';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import ApiClient from '../src/helpers/ApiClient';
import Routes from '../src/routes';

const client = new ApiClient();
const store = configureStore(browserHistory, client);

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('app')
)
