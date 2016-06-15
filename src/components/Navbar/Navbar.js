import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Cart } from '../../containers';

const style = require('./Navbar.scss');


const Navbar = ({ categories }) =>
  <nav className={style.block}>
    {categories.map((x, i) => {
      if (x.level === '2') {
        return <Link className={style.link} activeClassName={style.link_active} to={`/category/${x.url_key}`} key={i}>{x.name}</Link>;
      }
      return null;
    })}
    <Cart />
  </nav>;

Navbar.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default Navbar;
