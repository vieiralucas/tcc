// @flow

import React from 'react';
import Draggable from 'react-draggable';
import type { DraggableData } from 'react-draggable';

type ActorProps = {
  x: number;
  y: number;
  scale?: number;
  onMove: (x: number, y: number) => void
};

const Actor = ({ x, y, onMove, scale }: ActorProps) => {
  if (scale == null) {
    scale = 1;
  }

  const width = 20 * scale;
  const height = 70 * scale;
  const headRadius =  8 * scale;
  const legHeight = 20 * scale;

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

  const handleDrag = (e: Event, { x, y }: DraggableData) => onMove(x, y);

  return (
    <Draggable onDrag={ handleDrag } >
      <svg x={ x } y={ y } width={ width } height={ height } >
        <ellipse cx={ headCenter.x } cy={ headCenter.y }
          rx={ headRadius } ry={ headRadius }
          fillOpacity={ 0 } stroke="black" strokeWidth={ 1 } />

        /* body */
        <line x1={ bodyStart.x } y1={ bodyStart.y } x2={ bodyEnd.x } y2={ bodyEnd.y } stroke="black" strokeWidth={ 1 } />

        /* arm */
        <line x1={ arm.x1 } y1={ arm.y1 } x2={ arm.x2 } y2={ arm.y2 } stroke="black" strokeWidth={ 1 } />

        /* left leg */
        <line x1={ bodyEnd.x } y1={ bodyEnd.y } x2={ 0 } y2={ height } stroke="black" strokeWidth={ 1 } />
        /* right leg */
        <line x1={ bodyEnd.x } y1={ bodyEnd.y } x2={ width } y2={ height } stroke="black" strokeWidth={ 1 } />
      </svg>
    </Draggable>
  );
};

export default Actor;
