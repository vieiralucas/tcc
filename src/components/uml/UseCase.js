// @flow

import React from 'react';
import Draggable from 'react-draggable';
import type {DraggableData} from 'react-draggable';
import Selectable from './Selectable';

type UseCaseProps = {
  id: number;
  name: string;
  x: number;
  y: number;
  isSelected: boolean;
  onMove: (id: number, x: number, y: number) => void;
  onSelect: (id: number) => void;
  onUnselect: (id: number) => void;
};

const UseCase = ({id, name, x, y, onMove, isSelected, onSelect, onUnselect}: UseCaseProps) => {
  const fontSize = 20;
  const width = 200;
  const lines = name.match(/.{1,30}/g) || [];
  const height = fontSize * 3 * lines.length;

  const nameStyle = {
    fontSize: `${fontSize}px`,
 };

  const tspans = lines.map((line, i) => <tspan x={'50%'} dy={'1.3em'} key={i}>{line}</tspan>);
  const handleDrag = (e: Event, data: DraggableData) => onMove(id, x + data.deltaX , y + data.deltaY);

  return (
    <Selectable x={x} y={y} width={width} height={height} isSelected={isSelected} onMouseEnter={() => onSelect(id)} onMouseLeave={() => onUnselect(id)}>
      <Draggable onDrag={handleDrag}>
        <svg x={x} y={y} width={width} height={height} cursor={'pointer'}>
          <ellipse cx={width / 2} cy={height / 2}
            rx={width / 2} ry={height / 2}
            fillOpacity={0} stroke="black" strokeWidth={1} />
          <text textAnchor={'middle'} style={nameStyle}>
            {tspans}
          </text>
        </svg>
      </Draggable>
    </Selectable>
  );
};

export default UseCase;
