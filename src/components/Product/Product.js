import React, { Component } from 'react';

export default class extends Component {
  
  static propTypes = {
    data: React.PropTypes.object
  }

  render() {
    const { data } = this.props;

    return (
      <div style={{border: '1px solid #555', padding: '1.5em', display: 'inline-block', width: '200px', textAlign: 'center'}}>
        <img src={data.thumbnail} style={{maxWidth: '100%'}} />
        <span>{data.name}</span>
        <br />
        <br />
        <span style={{color: 'red'}}>{data.price}</span>

      </div>
    );
  }

}
