import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Cart } from '../../containers';

const style = require('./Navbar.scss');


const Navbar = ({ categories, brands }) =>
  <nav className={style.block}>
    <ul>
      {categories.map((x, i) => {
        if (x.level === '2') {
          return <li key={i}><Link className={style.link} activeClassName={style.link_active} to={`/category/${x.url_key}`} key={i}>{x.name}</Link></li>;
        }
        return null;
      })}
    </ul>
    <ul>
      {brands.map((x, i) => {
        return <li key={i}><Link className={style.link} activeClassName={style.link_active} to={`/manufacturer/${x.value}`} key={i}>{x.label}</Link></li>;
      })}
    </ul>
    <Cart />
  </nav>;

Navbar.propTypes = {
  categories: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired
};

export default Navbar;
