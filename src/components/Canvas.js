// @flow

import React, { Component, Children } from 'react';

type WheelEvent = {
  deltaY: number
};

class Canvas extends Component {
  state: {
    scale: number;
  };

  constructor() {
    super();

    this.state = {
      scale: 1
    };
  };

  handleZoom({ deltaY }: WheelEvent) {
    const newScale = this.state.scale + deltaY * 0.1;
    this.setState({
      scale: newScale >= 1 ? newScale : 1
    });
  }

  render() {
    const { scale } = this.state;
    const { children, width, height, style } = this.props;

    const childrenWithScale = Children.map(children,
                                           child => React.cloneElement(child, { scale }));

    return (
      <svg width={ width } height={ height } style={ style }
        onWheel={ this.handleZoom.bind(this) }>
        { childrenWithScale }
      </svg>
    );
  }
}

export default Canvas;
