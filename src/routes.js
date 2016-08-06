import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Home, Category, Checkout, Product, CMSPage, PageNotFound, AttributeCollection } from './containers';

export default () =>
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="category/:slug" component={Category} />
    <Route path=":attribute/:value" component={AttributeCollection} />
    <Route path="product/:id" component={Product} />
    <Route path="checkout" component={Checkout} />
    <Route path="cms/:slug" component={CMSPage} />
    <Route path="*" component={PageNotFound} status="404" />
  </Route>;
