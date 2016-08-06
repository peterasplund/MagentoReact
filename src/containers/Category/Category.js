import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LoadingIcon, ProductList } from '../../components/';
import { load } from '../../redux/modules/category';

@connect(
  state => ({ category: state.category }), { load }
)
export default class extends Component {

  static propTypes = {
    category: React.PropTypes.object,
    params: React.PropTypes.object,
    load: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.load(this.props.params.slug);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.slug !== this.props.params.slug) {
      this.props.load(nextProps.params.slug);
    }
  }

  render() {
    const { category } = this.props;
    if (category.loading) {
      return <LoadingIcon />;
    }
    return (
      <div>
        <h1>{this.props.params.slug}</h1>

        <ProductList products={category.products} />
      </div>
    );
  }

}
