import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { autobind } from 'core-decorators';

import { QuantityPicker } from '../';

import { add as addToCart } from '../../redux/modules/cart';
import { add as addMessage } from '../../redux/modules/messages';


const style = require('./CatalogProduct.scss');

numeral.languageData().delimiters.thousands = ' ';
numeral.languageData().delimiters.decimal = ',';

@connect(
  null, { addToCart, addMessage }
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

  @autobind
  addToCart(e) {
    console.log(e);
    e.preventDefault();
    this.setState({ isAdding: true });

    this.props.addToCart(this.props.data.id, this.state.qty).then(response => {
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

  render() {
    const { data } = this.props;
    const { isAdding } = this.state;

    return (
      <form className={style.block + (isAdding ? ` ${style.adding}` : '')}>
        <div className={style.wrapper}>
          <img src={data.thumbnail} alt={data.name} style={{ maxWidth: '100%' }} />
          <Link to={`/product/${data.id}`} className={style.name}>{data.name}</Link>
          <br />
          <br />
          <span style={{ color: 'red' }}>{`${numeral(data.price).format()} kr`}</span>
        </div>
        {data.type_id !== 'simple' &&
          <Link to={`/product/${data.id}`} className={style.name}>Read more</Link>
        }
        {data.type_id === 'simple' &&
          <div className={style.bottom}>
            <QuantityPicker className={style.quantitypicker} onSet={this.changeQty} />
            <button className={style.buy} onClick={this.addToCart}>Buy</button>
          </div>
        }
      </form>
    );
  }

}
