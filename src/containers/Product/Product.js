import React, { Component } from 'react';
import { connect } from 'react-redux';

import { load } from '../../redux/modules/product';

@connect(
  state => ({ product: state.product }), { load }
)
export default class extends Component {

  static propTypes = {
    product: React.PropTypes.object,
    load: React.PropTypes.func,
    params: React.PropTypes.object
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
        <img alt={product.data.name} src={product.data.image} />
        <br />
        <p>{product.data.description}</p>
      </div>
    );
  }

}
