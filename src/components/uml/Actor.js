import React, { Component } from 'react';

class Actor extends Component {
  constructor({ scale = 1 }) {
    super();

    this.width = 20 * scale;
    this.height = 70 * scale;
    this.headRadius =  8 * scale;
    this.legHeight = 20 * scale;
  }

  getHeadCenter() {
    return {
      x: this.width / 2,
      y: (this.height / 3) - this.headRadius
    };
  }

  render() {
    const headCenter = this.getHeadCenter();

    const bodyStart = {
      x: headCenter.x,
      y: headCenter.y + this.headRadius
    };
    const bodyEnd = {
      x: bodyStart.x,
      y: this.height - this.legHeight
    };
    const arm = {
      x1: 0,
      y1: (this.height / 2) - (this.height / 20),
      x2: this.width,
      y2: (this.height / 2) - (this.height / 20)
    };

    return (
      <svg width={this.width} height={this.height}>
        <ellipse cx={headCenter.x} cy={headCenter.y}
          rx={this.headRadius} ry={this.headRadius}
          fillOpacity={0} stroke="black" strokeWidth={1} />

        /* body */
        <line x1={bodyStart.x} y1={bodyStart.y} x2={bodyEnd.x} y2={bodyEnd.y} stroke="black" strokeWidth={1} />

        /* arm */
        <line x1={arm.x1} y1={arm.y1} x2={arm.x2} y2={arm.y2} stroke="black" strokeWidth={1} />

        /* left leg */
        <line x1={bodyEnd.x} y1={bodyEnd.y} x2={0} y2={this.height} stroke="black" strokeWidth={1} />
        /* right leg */
        <line x1={bodyEnd.x} y1={bodyEnd.y} x2={this.width} y2={this.height} stroke="black" strokeWidth={1} />
      </svg>
    );
  }
}

export default Actor;
