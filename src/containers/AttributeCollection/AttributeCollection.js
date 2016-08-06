import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LoadingIcon, ProductList } from '../../components/';
import { load } from '../../redux/modules/attributeCollection';

@connect(
  state => ({ attributeCollection: state.attributeCollection }), { load }
)
export default class extends Component {

  static propTypes = {
    attributeCollection: React.PropTypes.object.isRequired,
    params: React.PropTypes.object,
    load: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.load(this.props.params.attribute, this.props.params.value);
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.params.attribute !== this.props.params.attribute) && (nextProps.params.value !== this.props.params.value))  {
      this.props.load(nextProps.params.attribute, nextProps.params.value);
    }
  }

  render() {
    const { attributeCollection } = this.props;
    if (attributeCollection.loading) {
      return <LoadingIcon />;
    }
    return (
      <div>
        <h1>{attributeCollection.data.attributeValue}</h1>

        <ProductList products={attributeCollection.data.products} />
      </div>
    );
  }

}
