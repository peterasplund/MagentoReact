import React, { Component } from 'react';
import { Router, Route } from 'react-router';

import { Home, Category, Checkout } from './containers';

class Routes extends Component {

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={Home} />
        <Route path="/category/:id" component={Category} />
        <Route path="/checkout" component={Checkout} />
      </Router>
    );
  }

}

export default Routes;
