import React, { Component } from 'react';
import { autobind } from 'core-decorators';

const style = require('./QuantityPicker.scss');

export default class extends Component {

  static propTypes = {
    onSet: React.PropTypes.func,
    className: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      qty: 1
    };
  }

  @autobind
  changeQty(e) {
    const value = e.target.value;
    if (isNaN(value) || value < 1) {
      return;
    }

    this.setState({ qty: parseInt(value, 10) }, () => {
      this.props.onSet(this.state.qty);
    });
  }

  @autobind
  decrement(e) {
    e.preventDefault();

    if (this.state.qty > 1) {
      this.setState({ qty: this.state.qty - 1 }, () => {
        this.props.onSet(this.state.qty);
      });
    }
  }

  @autobind
  increment(e) {
    e.preventDefault();

    this.setState({ qty: this.state.qty + 1 }, () => {
      this.props.onSet(this.state.qty);
    });
  }

  render() {
    return (
      <div className={this.props.className}>
        <button className={style.button} onClick={this.decrement}>-</button>
        <input className={style.input} value={this.state.qty} onChange={this.changeQty} name="qty" ref="qty" />
        <button className={style.button} onClick={this.increment}>+</button>
      </div>
    );
  }
}
