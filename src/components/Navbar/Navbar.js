import React, { Component } from 'react';
import { Link } from 'react-router';
import { Cart } from '../../containers';

const style = require('./Navbar.scss');

export default class extends Component {

  static propTypes = {
    categories: React.PropTypes.array
  }

  render() {
    const { categories } = this.props;

    return (
      <nav className={style.block}>
        {categories.data.map((x, i) => {
          if (x.level === "2") {
            return <Link className={style.link} activeClassName={style.link_active} to={'/category/' + x.url_key} key={i}>{x.name}</Link>
          }
        })}
        <Cart />
      </nav>
    );
  }

}
