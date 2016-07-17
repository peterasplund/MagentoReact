import React, { Component } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import { ProductOptions, QuantityPicker, Price } from '../../components';
import { Media } from '../';

import { load } from '../../redux/modules/product';
import { add as addToCart } from '../../redux/modules/cart';
import { add as addMessage } from '../../redux/modules/messages';

const style = require('./Product.scss');

@connect(
  state => ({ product: state.product }), { load, addToCart, addMessage }
)
export default class extends Component {

  static propTypes = {
    product: React.PropTypes.object,
    params: React.PropTypes.object,
    load: React.PropTypes.func,
    addToCart: React.PropTypes.func,
    addMessage: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      isAdding: false,
      qty: 1
    };
  }

  componentWillMount() {
    this.props.load(this.props.params.id);
  }

  @autobind
  addToCart(e) {
    e.preventDefault();
    const { product } = this.props;
    this.setState({ isAdding: true });

    this.props.addToCart(product.data.entity_id, this.state.qty).then(response => {
      this.props.addMessage('success', response.message);
      this.setState({
        ...this.state,
        isAdding: false
      });
    }).catch(err => {
      console.log(err);
      this.props.addMessage('error', 'Ett fel inträffade. Försök igen senare.');
      this.setState({
        ...this.state,
        isAdding: false,
      });
    });
  }

  @autobind
  changeQty(qty) {
    this.setState({
      ...this.state,
      qty
    });
  }

  renderManufacturer(manufacturer) {
    if (!manufacturer.name) {
      return <span />;
    }
    return <h2>{manufacturer.name}</h2>;
  }

  render() {
    const { product } = this.props;
    if (product.loading || !product.loaded) {
      return <div>Laddar</div>;
    }

    return (
      <div>
        <div className={style.left}>
          <h1>{product.data.name}</h1>
          {this.renderManufacturer(product.data.manufacturer)}
          <p className={style.description}>{product.data.description}</p>
          <ProductOptions options={product.data.options} />
          <div>
            <Price className={style.price} price={parseFloat(product.data.price, 10)} msrp={parseFloat(product.data.msrp, 10)} modifier="large" />
            <QuantityPicker className={style.quantitypicker} onSet={this.changeQty} />
            <button className={style.buy} onClick={this.addToCart}>Buy</button>
          </div>
        </div>
        <div className={style.right}>
          <Media image={product.data.image} gallery={product.data.media_gallery} />
        </div>
      </div>
    );
  }

}
