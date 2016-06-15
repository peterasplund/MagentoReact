import React, { PropTypes } from 'react';
import { Product } from '../';

const ProductList = ({ products }) =>
  <div>
    {products.map((x, i)  => <Product key={i} data={x} />)}
  </div>;

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
