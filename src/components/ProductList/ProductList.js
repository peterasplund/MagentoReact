import React, { Component } from 'react';
import { Product } from '../';

export default class extends Component {

  static propTypes = {
    products: React.PropTypes.array,
  }

  render() {
    return (
      <div>
        {this.props.products.map((x, i)  => <Product key={i} data={x} />)}
      </div>
    );
  }

}
