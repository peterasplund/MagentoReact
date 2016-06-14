import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router';

import { ProductList } from '../../components/';
import { load, add, remove, toggle } from '../../redux/modules/cart';

numeral.languageData().delimiters.thousands = ' ';
numeral.languageData().delimiters.decimal = ',';

@connect(
  state => ({cart: state.cart}), { load, add, remove, toggle }
)
export default class extends Component {

  static propTypes = {
    category: React.PropTypes.object,
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
      <div>
        {items.map((x, i) => {
          return (
            <div key={i}>
            {x.name} x {x.qty} - <span style={{color: 'red'}}>{numeral(x.price).format()} kr</span>
            </div>
          );
        })}
        <span>Total: {numeral(cart.data.summary.grand_total).format()} kr</span>
      </div>
    );
  }

  render() {
    const { cart } = this.props;
    if (!cart.loaded || !cart.data) {
      return <div />;
    }
    return (
      <div>
        <h3 onClick={this.props.toggle} style={{cursor: 'pointer'}}>Varukorg ({cart.data.summary.qty})</h3>
        { (cart.open) ? this.renderBody(cart.data.items) : <div /> }
      </div>
    );
  }

}
