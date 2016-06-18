import React, { PropTypes } from 'react';
import numeral from 'numeral';

const style = require('./Price.scss');

const Price = ({ price, msrp, modifier, className, delimiters }) => {
  numeral.languageData().delimiters.thousands = ' ';
  numeral.languageData().delimiters.decimal = ',';
  if (typeof delimiters !== 'undefined') {
    numeral.languageData().delimiters = delimiters;
  }
  const modifierClass = style['price_' + modifier];
  return (
    <div className={className}>
      {!isNaN(msrp) &&
        <span className={style.msrp + ' ' + modifierClass}>{`${numeral(msrp).format()} kr`}</span>
      }
      <span className={style.price + ' ' + modifierClass}>{`${numeral(price).format()} kr`}</span>
    </div>
  );
};

Price.propTypes = {
  price: PropTypes.number.isRequired,
  msrp: PropTypes.number,
  modifier: PropTypes.string,
  className: PropTypes.string,
  delimiters: PropTypes.object,
};

export default Price;
