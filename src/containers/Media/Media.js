import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MediaGallery } from '../../components';
import { selectImage } from '../../redux/modules/media';

const style = require('./Media.scss');

@connect(
  state => ({ media: state.media }), { selectImage }
)
export default class extends Component {

  static propTypes = {
    image: React.PropTypes.array,
    gallery: React.PropTypes.array,
    media: React.PropTypes.object,
    selectImage: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.selectImage(null);
  }

  render() {
    return (
      <div className={style.block}>
        <picture className={style.image}>
          {/*<!--[if IE 9]><video style="display: none;"><![endif]-->*/}
          <source alt={this.props.image} srcSet={this.props.media.selectedImage || this.props.image[0] + ', ' + this.props.image[1] + ' 2x'} media="(min-width: 400px)" />
          {/*<!--[if IE 9]></video><![endif]-->*/}
          <img
            alt={this.props.image}
            className={style.image}
            srcSet={this.props.media.selectedImage || this.props.image[0] + ', ' + this.props.image[1] + ' 2x'}
            src={this.props.media.selectedImage || this.props.image[0]}
          />
        </picture>
        <MediaGallery images={this.props.gallery} selected={this.props.media.selectedImage} selectImage={this.props.selectImage} />
      </div>
    );
  }
}
