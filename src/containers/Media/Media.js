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
    image: React.PropTypes.string,
    gallery: React.PropTypes.array,
    media: React.PropTypes.object,
    selectImage: React.PropTypes.func,
  }

  render() {
    return (
      <div className={style.block}>
        <img className={style.image} alt={this.props.image} src={this.props.media.selectedImage || this.props.image} />
        <MediaGallery images={this.props.gallery} selected={this.props.media.selectedImage} selectImage={this.props.selectImage} />
      </div>
    );
  }
}
