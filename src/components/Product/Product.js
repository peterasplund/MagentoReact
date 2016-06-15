import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import numeral from 'numeral';

import { QuantityPicker } from '../';

import { add as addToCart } from '../../redux/modules/cart';
import { add as addMessage } from '../../redux/modules/messages';

const style = require('./Product.scss');

numeral.languageData().delimiters.thousands = ' ';
numeral.languageData().delimiters.decimal = ',';

@connect(
  state => ({}), { addToCart, addMessage }
)
export default class extends Component {
  
  static propTypes = {
    data: React.PropTypes.object,
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

  addToCart(product, e) {
    e.preventDefault();
    this.setState({isAdding: true});

    this.props.addToCart(product, this.state.qty).then(response => {
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

  changeQty(qty) {
    this.setState({
      ...this.state,
      qty: qty
    });
  }

  render() {
    const { data } = this.props;
    const { isAdding } = this.state;

    return (
      <form className={style.block + (isAdding ? ' ' + style.adding : '')}>
        <div className={style.wrapper}>
          <img src={data.thumbnail} style={{maxWidth: '100%'}} />
          <Link to={'/product/' + data.id} className={style.name}>{data.name}</Link>
          <br />
          <br />
          <span style={{color: 'red'}}>{numeral(data.price).format() + ' kr'}</span>
          <br />
          <br />
        </div>
        <div className={style.bottom}>
          <QuantityPicker className={style.quantitypicker} onSet={this.changeQty.bind(this)} />
          <button className={style.buy} onClick={this.addToCart.bind(this, data.id)}>Buy</button>
        </div>
      </form>
    );
  }

}
