import React, { Component } from 'react';
import { Link } from 'react-router';

export default class extends Component {

  render() {
    return (
      <div>
        <h1>Hem</h1>
        <Link to="/checkout">Till kassan</Link>
        </div>
    );
  }

}
