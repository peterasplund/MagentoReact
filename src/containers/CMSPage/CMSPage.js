import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LoadingIcon } from '../../components';

import { load } from '../../redux/modules/cmspage';

@connect(
  state => ({ cmspage: state.cmspage }), { load }
)
export default class extends Component {

  static propTypes = {
    cmspage: React.PropTypes.object,
    params: React.PropTypes.object,
    load: React.PropTypes.func
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    const { router } = this.context;
    this.props.load(this.props.params.slug).then((result) => {
      if (!result.content) {
        router.push('404');
      }
    }).catch(() => {
      router.push('404');
    });
  }

  render() {
    const { cmspage } = this.props;
    if (cmspage.loading || !cmspage.loaded) {
      return <LoadingIcon />;
    }

    return (
      <div>
        <h1>{cmspage.data.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: cmspage.data.content }} />
      </div>
    );
  }

}
