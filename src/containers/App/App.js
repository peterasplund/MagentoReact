import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Messages } from '../';
import { Navbar } from '../../components';

import { load } from '../../redux/modules/categories';

import logo from './logo.svg';

const style = require('./App.scss');

@connect(
  state => ({categories: state.categories}), { load }
)

export default class extends Component {

  static propTypes = {
    categories: React.PropTypes.object,
    children: React.PropTypes.object
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    if (this.props.categories.loading) {
      return <div>Laddar...</div>;
    }

    return (
      <div className={style.block}>
        <div className={style.wrapper}>
          <div className={style.logo} dangerouslySetInnerHTML={{__html: logo}}>
          </div>
        </div>
        <Navbar categories={this.props.categories} />
        <div className={style.wrapper}>
          {this.props.children}
        </div>
        
        { /*<Messages />*/ }
      </div>
    );
  }

}
