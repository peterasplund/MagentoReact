import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { App, Home, Category, Checkout } from './containers';

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/category/:slug" component={Category} />
      <Route path="/checkout" component={Checkout} />
    </Route>
  );
}
