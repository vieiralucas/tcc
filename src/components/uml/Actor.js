import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Actor extends Component {
  constructor(props) {
    super();
  }

  handleDrag(e, data) {
    this.props.onMove(data.x, data.y);
  }

  render() {
    const scale = this.props.scale || 1;

    const width = 20 * scale;
    const height = 70 * scale;
    const headRadius =  8 * scale;
    const legHeight = 20 * scale;

    const { x , y } = this.props;

    const headCenter = {
      x: width / 2,
      y: (height / 3) - headRadius
    };

    const bodyStart = {
      x: headCenter.x,
      y: headCenter.y + headRadius
    };
    const bodyEnd = {
      x: bodyStart.x,
      y: height - legHeight
    };
    const arm = {
      x1: 0,
      y1: (height / 2) - (height / 20),
      x2: width,
      y2: (height / 2) - (height / 20)
    };

    return (
      <Draggable onDrag={this.handleDrag.bind(this)} >
        <svg x={x} y={y} width={width} height={height} >
          <ellipse cx={headCenter.x} cy={headCenter.y}
            rx={headRadius} ry={headRadius}
            fillOpacity={0} stroke="black" strokeWidth={1} />

          /* body */
          <line x1={bodyStart.x} y1={bodyStart.y} x2={bodyEnd.x} y2={bodyEnd.y} stroke="black" strokeWidth={1} />

          /* arm */
          <line x1={arm.x1} y1={arm.y1} x2={arm.x2} y2={arm.y2} stroke="black" strokeWidth={1} />

          /* left leg */
          <line x1={bodyEnd.x} y1={bodyEnd.y} x2={0} y2={height} stroke="black" strokeWidth={1} />
          /* right leg */
          <line x1={bodyEnd.x} y1={bodyEnd.y} x2={width} y2={height} stroke="black" strokeWidth={1} />
        </svg>
      </Draggable>
    );
  }
}

export default Actor;
