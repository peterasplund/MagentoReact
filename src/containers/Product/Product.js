import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { load } from '../../redux/modules/product';

@connect(
  state => ({product: state.product}), { load }
)
export default class extends Component {

  static propTypes = {
    product: React.PropTypes.object,
    load: React.PropTypes.func
  }

  componentWillMount() {
    this.props.load(this.props.params.id);
  }

  render() {
    const { product } = this.props;
    if (product.loading) {
      return <div>Laddar</div>;
    }
    return (
      <div>
        <h1>{product.data.name}</h1>
        <img src={product.data.image} />
        <br />
        <p>{product.data.description}</p>
      </div>
    );
  }

}
