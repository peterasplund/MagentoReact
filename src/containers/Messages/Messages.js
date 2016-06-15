import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as messageActions from '../../redux/modules/messages';
import { autobind } from 'core-decorators';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const style = require('./Messages.scss');

@connect(
  state => ({ messages: state.messages }),
  {
    closeMessage: messageActions.close,
    closeNewest: messageActions.closeNewest
  })
export default class Message extends Component {
  static propTypes = {
    messages: PropTypes.array,
    closeMessage: PropTypes.func,
    closeNewest: PropTypes.func,
    timeout: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      clickEvent: this.bodyClick.bind(this)
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.state.clickEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.state.clickEvent);
  }

  bodyClick(e) {
    if (this.props.messages.length) {
      if (e.clientY > window.innerHeight / 1.3) {
        this.props.closeNewest();
      }
    }
  }

  @autobind
  closeMessage(id, e) {
    if (typeof e !== 'undefined') {
      e.stopPropagation();
    }
    this.props.closeMessage(id);
  }

  renderMessage(message) {
    const classes = `${style.message} ${style[message.status]}`;

    setTimeout(() => {
      this.closeMessage(message.id);
    }, this.props.timeout || 3000);

    return (
      <div key={message.id} className={classes}>
        <div>
          {message.text}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={style.container}>
        <ReactCSSTransitionGroup transitionName="slide-down" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
        {this.props.messages.map((message) => this.renderMessage(message))}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
