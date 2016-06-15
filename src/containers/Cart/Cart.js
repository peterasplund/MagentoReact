import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router';

import { load, add, remove, toggle } from '../../redux/modules/cart';

const style = require('./Cart.scss');

numeral.languageData().delimiters.thousands = ' ';
numeral.languageData().delimiters.decimal = ',';

@connect(
  state => ({ cart: state.cart }), { load, add, remove, toggle }
)
export default class extends Component {

  static propTypes = {
    category: React.PropTypes.object,
    cart: React.PropTypes.object,
    load: React.PropTypes.func,
    add: React.PropTypes.func,
    remove: React.PropTypes.func,
    toggle: React.PropTypes.func,
  }

  componentDidMount() {
    this.props.load();
  }

  renderBody(items) {
    const { cart } = this.props;

    return (
      <div className={style.body}>
        {items.map((x, i) =>
          <div key={i}>
            {x.name} x {x.qty} - <span style={{ color: 'red' }}>{numeral(x.price).format()} kr</span>
          </div>
        )}
        <div className={style.totals}>
          <span>Total: {numeral(cart.data.summary.grand_total).format()} kr</span>
        </div>
        {items.length &&
          <Link to="/checkout">Checkout</Link>
        }
      </div>
    );
  }

  render() {
    const { cart } = this.props;
    if (!cart.loaded || !cart.data) {
      return <div />;
    }
    return (
      <div className={style.block}>
        <span className={style.heading} onClick={this.props.toggle}>Cart ({cart.data.summary.qty})</span>
        {(cart.open) ? this.renderBody(cart.data.items) : <div />}
      </div>
    );
  }

}
