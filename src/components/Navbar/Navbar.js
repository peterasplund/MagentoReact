import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Cart } from '../../containers';

const style = require('./Navbar.scss');


const Navbar = ({ categories, brands }) =>
  <nav className={style.block}>
    <ul className={style.menu}>
      <li>Categories
        <ul className={style.subMenu}>
          {categories.map((x, i) => {
            if (x.level === '2') {
              return <li key={i}><Link className={style.link} activeClassName={style.link_active} to={`/category/${x.url_key}`} key={i}>{x.name}</Link></li>;
            }
            return null;
          })}
        </ul>
      </li>
      <li>Brands
        <ul className={style.subMenu}>
          {brands.map((x, i) => {
            return <li key={i}><Link className={style.link} activeClassName={style.link_active} to={`/manufacturer/${x.value}`} key={i}>{x.label}</Link></li>;
          })}
        </ul>
      </li>
      <li>
        <Cart />
      </li>
    </ul>
  </nav>;

Navbar.propTypes = {
  categories: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired
};

export default Navbar;
