import React, { Component } from 'react';
import { Link } from 'react-router';

export default class extends Component {

  render() {
    return (
      <div>
        <h1>Kategori {this.props.params.id}</h1>
        <Link to="/">Tillbaka</Link>
        </div>
    );
  }

}
