import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { load } from '../../redux/modules/categories';

@connect(
  state => ({categories: state.categories}), { load }
)
export default class extends Component {

  static propTypes = {
    categories: React.PropTypes.object,
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    if (this.props.categories.loading) {
      return <div>Laddar...</div>;
    }

    return (
      <div>
        <h1>Hem</h1>
        {this.props.categories.data.map((x, i) => {
          if (x.level === "2") {
            return <Link style={{display: 'inline-block', padding: '0.5em 1em', background: '#333', color: '#fff'}} to={'/category/' + x.url_key} key={i}>{x.name}</Link>
          }
        })}
        <br />
        <br />
        <Link to="/checkout">Till kassan</Link>
        </div>
    );
  }

}
