// @flow

import React, { Component } from 'react';

class Canvas extends Component {
  render() {
    return <svg>{this.props.children}</svg>;
  }
}

export default Canvas;
