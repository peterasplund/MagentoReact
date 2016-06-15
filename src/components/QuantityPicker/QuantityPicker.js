import React, { Component } from 'react';

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

  changeQty(e) {
    const value = e.target.value;
    if (isNaN(value) || value < 1) {
      return;
    }

    this.setState({qty: parseInt(value, 10)}, () => {
      this.props.onSet(this.state.qty);
    });
  }

  decrement(e) {
    e.preventDefault();

    if (this.state.qty > 1) {
      this.setState({qty: this.state.qty - 1}, () => {
        this.props.onSet(this.state.qty);
      });
    }
  }

  increment(e) {
    e.preventDefault();

    this.setState({qty: this.state.qty + 1}, () => {
      this.props.onSet(this.state.qty);
    });
  }

  render() {
    const { data } = this.props;

    return (
      <div className={this.props.className}>
        <button className={style.button} onClick={this.decrement.bind(this)}>-</button>
        <input className={style.input} value={this.state.qty} onChange={this.changeQty.bind(this)} name="qty" ref="qty" />
        <button className={style.button} onClick={this.increment.bind(this)}>+</button>
      </div>
    );
  }

}
