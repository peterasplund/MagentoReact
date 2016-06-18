import React, { Component } from 'react';

const style = require('./ProductOptions.scss');

export default class extends Component {

  static propTypes = {
    options: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      qty: 1
    };
  }

  renderValues(option) {
    if (typeof option.values === 'undefined') {
      return <div />;
    }
    return option.values.map((value, i) =>
      <div key={i}>
        <input id={`${value.option_id}_${i}`} type="radio" name={value.option_id} value={value.option_id} />
        <label htmlFor={`${value.option_id}_${i}`}>{value.title}</label>
      </div>
    );
  }

  renderOptions(options) {
    if (!options.isArray) {
      return <div />;
    }
    return options.map(option =>
      <div>
        <div><strong>{option.title}</strong></div>
          {this.renderValues(option)}
      </div>
    );
  }

  render() {
    return (
      <div className={style.block}>
        {this.renderOptions(this.props.options)}
      </div>
    );
  }
}
