import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Home, Category, Checkout, Product } from './containers';

export default () =>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/category/:slug" component={Category} />
    <Route path="/product/:id" component={Product} />
    <Route path="/checkout" component={Checkout} />
  </Route>;
