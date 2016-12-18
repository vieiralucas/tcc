import React from 'react';

const ActorSVG = ({ width = 200, height = 70, cursor }) => {
    const headRadius =  8;
    const legHeight = 20;
    const fontSize = 10;
    const actorWidth = 20;

    const headCenter = {
      x: width / 2,
      y: (height / 3.5) - headRadius
    };
    const bodyStart = {
      x: headCenter.x,
      y: headCenter.y + headRadius
    };
    const bodyEnd = {
      x: bodyStart.x,
      y: height - legHeight - fontSize
    };
    const arm = {
      x1: (width / 2) - (actorWidth / 2),
      y1: (height / 2) - (height / 20),
      x2: (width / 2) + (actorWidth / 2),
      y2: (height / 2) - (height / 20)
    };

    return (
      <svg width={width} height={height} cursor={cursor}>
        <ellipse cx={headCenter.x} cy={headCenter.y}
          rx={headRadius} ry={headRadius}
          fillOpacity={0} stroke='black' strokeWidth={1} />

        /* body */
        <line x1={bodyStart.x} y1={bodyStart.y} x2={bodyEnd.x} y2={bodyEnd.y} stroke='black' strokeWidth={1} />

        /* arm */
        <line x1={arm.x1} y1={arm.y1} x2={arm.x2} y2={arm.y2} stroke='black' strokeWidth={1} />

        /* left leg */
        <line x1={bodyEnd.x} y1={bodyEnd.y} x2={arm.x1} y2={height - fontSize} stroke='black' strokeWidth={1} />
        /* right leg */
        <line x1={bodyEnd.x} y1={bodyEnd.y} x2={arm.x2} y2={height - fontSize} stroke='black' strokeWidth={1} />
      </svg>
    );

};

export default ActorSVG;
