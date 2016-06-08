import React from 'react';
import { render } from 'react-dom';
import configureStore from '../src/redux/store';
import { Provider } from 'react-redux';
import Test from '../src/components/Test';

const store = configureStore();

render(
  <Provider store={store}>
    <Test/>
  </Provider>,
  document.getElementById('app')
)
