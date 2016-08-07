import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Messages } from '../';
import { LoadingIcon, Navbar } from '../../components';

import { load as loadCategories } from '../../redux/modules/categories';
import { load as loadAttributes } from '../../redux/modules/attributeValues';

import logo from './logo.svg';

const style = require('./App.scss');

@connect(
  state => ({ categories: state.categories }), { loadCategories }
)

@connect(
  state => ({ brands: state.attributeValues }), { loadAttributes }
)

export default class extends Component {

  static propTypes = {
    categories: React.PropTypes.object,
    brands: React.PropTypes.object,
    children: React.PropTypes.object,
    loadCategories: React.PropTypes.func,
    loadAttributes: React.PropTypes.func
  }

  componentDidMount() {
    this.props.loadCategories();
    this.props.loadAttributes('manufacturer');
  }

  render() {
    if (!this.props.categories.loaded) {
      return <LoadingIcon />;
    }

    return (
      <div className={style.block}>
        <div className={style.wrapper}>
          <Link className={style.logo_link} to="/">
            <div className={style.logo} dangerouslySetInnerHTML={{ __html: logo }} />
          </Link>
        </div>
        <Navbar categories={this.props.categories.data} brands={this.props.brands.data} />
        <div className={style.wrapper}>
          {this.props.children}
        </div>

        <Messages />
      </div>
    );
  }

}
