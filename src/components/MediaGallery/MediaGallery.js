import React, { Component } from 'react';

const style = require('./MediaGallery.scss');

export default class extends Component {

  static propTypes = {
    images: React.PropTypes.array,
    selectImage: React.PropTypes.func,
  }

  render() {
    return (
      <div>
        {this.props.images.map((image, i) => <img key={i} className={style.image + (this.props.selected === image.image ? ` ${style.active}`  : '')} src={image.thumbnail} onClick={this.props.selectImage.bind(this, image.image)} alt={image} />)}
      </div>
    );
  }
}
