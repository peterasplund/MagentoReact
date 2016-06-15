import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

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

  addToCart(product, e) {
    e.preventDefault();

    this.props.addToCart(product, this.refs.qty.value).then(response => {
      this.props.addMessage('success', response.message);
    }).catch(err => {
      console.log(err);
      this.props.addMessage('error', 'Ett fel inträffade. Försök igen senare.');
    });
  }

  render() {
    const { data } = this.props;

    return (
      <form className={style.block}>

        <img src={data.thumbnail} style={{maxWidth: '100%'}} />
        <strong>{data.name}</strong>
        <br />
        <br />
        <span style={{color: 'red'}}>{numeral(data.price).format() + ' kr'}</span>
        <br />
        <br />
        <input defaultValue="1" name="qty" ref="qty" />
        <button onClick={this.addToCart.bind(this, data.id)}>Köp</button>

      </form>
    );
  }

}
