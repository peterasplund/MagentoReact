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

  constructor(props) {
    super(props);
    this.state = {
      isAdding: false
    };
  }

  addToCart(product, e) {
    e.preventDefault();
    this.setState({isAdding: true});

    this.props.addToCart(product, this.refs.qty.value).then(response => {
      this.props.addMessage('success', response.message);
      this.setState({isAdding: false});
    }).catch(err => {
      console.log(err);
      this.props.addMessage('error', 'Ett fel inträffade. Försök igen senare.');
      this.setState({isAdding: false});
    });
  }

  render() {
    const { data } = this.props;
    const { isAdding } = this.state;

    return (
      <form className={style.block + (isAdding ? ' ' + style.adding : '')}>

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
