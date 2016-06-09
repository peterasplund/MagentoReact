import React, { Component } from 'react';

import numeral from 'numeral';

numeral.languageData().delimiters.thousands = ' ';
numeral.languageData().delimiters.decimal = ',';

const blockStyle = {
  border: '1px solid #555',
  padding: '1.5em',
  display: 'inline-block',
  verticalAlign: 'top',
  width: '200px',
  minHeight: '335px',
  marginBottom: '10px',
  marginRight: '10px',
  textAlign: 'center'
};

export default class extends Component {
  
  static propTypes = {
    data: React.PropTypes.object
  }

  render() {
    const { data } = this.props;

    return (
      <form style={blockStyle}>

        <img src={data.thumbnail} style={{maxWidth: '100%'}} />
        <strong>{data.name}</strong>
        <br />
        <br />
        <span style={{color: 'red'}}>{numeral(data.price).format() + ' kr'}</span>
        <br />
        <br />
        <input defaultValue="1" name="qty" />
        <button>Köp</button>

      </form>
    );
  }

}
