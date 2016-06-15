import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Messages } from '../';
import { Navbar } from '../../components';

import { load } from '../../redux/modules/categories';

import logo from './logo.svg';

const style = require('./App.scss');

@connect(
  state => ({ categories: state.categories }), { load }
)

export default class extends Component {

  static propTypes = {
    categories: React.PropTypes.object,
    children: React.PropTypes.object,
    load: React.PropTypes.func,
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    if (!this.props.categories.loaded) {
      return <div>Laddar...</div>;
    }
    console.log(this.props.categories);
    return (
      <div className={style.block}>
        <div className={style.wrapper}>
          <Link className={style.logo_link} to="/">
            <div className={style.logo} dangerouslySetInnerHTML={{ __html: logo }} />
          </Link>
        </div>
        <Navbar categories={this.props.categories.data} />
        <div className={style.wrapper}>
          {this.props.children}
        </div>

        <Messages />
      </div>
    );
  }

}
