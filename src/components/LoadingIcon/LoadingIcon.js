import React, { Component } from 'react';

const style = require('./LoadingIcon.scss');

export default class extends Component {

  render() {
    return (
      <div className={style.iconWrapper}>
        <div className={style.loadingIcon}></div>
      </div>
    );
  }
}
