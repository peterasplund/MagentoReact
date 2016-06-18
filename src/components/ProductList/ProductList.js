import React, { PropTypes } from 'react';
import { CatalogProduct } from '../';

const ProductList = ({ products }) =>
  <div>
    {products.map((x, i)  => <CatalogProduct key={i} data={x} />)}
  </div>;

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
