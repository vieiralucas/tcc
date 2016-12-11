// @flow

import React from 'react';
import Draggable from 'react-draggable';
import type { DraggableData } from 'react-draggable';

type UseCaseProps = {
  name: string;
  x: number;
  y: number;
  scale?: number;
  onMove: (x: number, y: number) => void;
};

const UseCase = ({ name, x, y, onMove, scale }: UseCaseProps) => {
  if (scale == null) {
    scale = 1;
  }

  const fontSize = 10 * scale;
  const width = 200 * scale;
  const lines = name.match(/.{1,30}/g) || [];
  const height = fontSize * 1.5 * lines.length;

  const nameStyle = {
    fontSize: `${fontSize}px`,
  };

  const tspans = lines.map((line, i) => <tspan x={ '50%' } dy={ '1.3em' } key={ i }>{ line }</tspan>);
  const handleDrag = (e: Event, data: DraggableData) => onMove(x + data.deltaX , y + data.deltaY);

  return (
    <Draggable onDrag={ handleDrag }>
      <svg x={ x } y={ y } width={ width } height={ height } cursor={ 'pointer' }>
        <ellipse cx={ width / 2 } cy={ height / 2 }
          rx={ width / 2 } ry={ height / 2 }
          fillOpacity={ 0 } stroke="black" strokeWidth={ 1 } />
        <text textAnchor={ 'middle' } style={ nameStyle }>
          { tspans }
        </text>
      </svg>
    </Draggable>
  );
};

export default UseCase;
