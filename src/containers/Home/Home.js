import React, { Component } from 'react';
import { Link } from 'react-router';

export default class extends Component {

  render() {
    return (
      <div>
        <h1>Hem</h1>
        <Link to="/category/1">Kategori 1</Link>
        <Link to="/category/2">Kategori 2</Link>
        <Link to="/category/3">Kategori 3</Link>
        <br />
        <br />
        <Link to="/checkout">Till kassan</Link>
        </div>
    );
  }

}
