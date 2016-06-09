import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { ProductList } from '../../components/';
import { load } from '../../redux/modules/category';

@connect(
  state => ({category: state.category}), { load }
)
export default class extends Component {

  static propTypes = {
    category: React.PropTypes.object,
    load: React.PropTypes.func
  }

  componentDidMount() {
    this.props.load(this.props.params.slug);
  }

  render() {
    const { category } = this.props;
    if (category.loading) {
      return <div>Laddar</div>;
    }
    return (
      <div>
        <h1>Kategori {this.props.params.slug}</h1>

        <ProductList products={category.products} />

        <Link to="/">Tillbaka</Link>
        </div>
    );
  }

}
