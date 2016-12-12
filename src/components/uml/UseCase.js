// @flow

import React from 'react';
import Draggable from 'react-draggable';
import type { DraggableData } from 'react-draggable';
import Selectable from './Selectable';

type UseCaseProps = {
  id: number;
  name: string;
  x: number;
  y: number;
  scale?: number;
  onMove: (x: number, y: number) => void;
};

const UseCase = ({ id, name, x, y, onMove, scale }: UseCaseProps) => {
  if (scale == null) {
    scale = 1;
  }

  const fontSize = 20 * scale;
  const width = 200 * scale;
  const lines = name.match(/.{1,30}/g) || [];
  const height = fontSize * 3 * lines.length;

  const nameStyle = {
    fontSize: `${fontSize}px`,
  };

  const tspans = lines.map((line, i) => <tspan x={ '50%' } dy={ '1.3em' } key={ i }>{ line }</tspan>);
  const handleDrag = (e: Event, data: DraggableData) => onMove(id, x + data.deltaX , y + data.deltaY);

  return (
    <Selectable x={ x } y={ y } width={ width } height={ height } isSelected={ true }>
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
    </Selectable>
  );
};

export default UseCase;
