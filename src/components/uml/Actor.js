// @flow

import React from 'react';
import Draggable from 'react-draggable';
import type {DraggableData} from 'react-draggable';
import Selectable from './Selectable';

type ActorProps = {
  id: number;
  name: string;
  x: number;
  y: number;
  isSelected: boolean;
  onMove: (id: number, x: number, y: number) => void;
  onSelect: (id: number) => void;
  onUnselect: (id: number) => void;
};

const Actor = ({id, name, x, y, onMove, isSelected, onSelect, onUnselect}: ActorProps) => {
  const fontSize = 10;
  const nameWidth = fontSize * name.length;
  const actorWidth = 20;
  const width = Math.max(actorWidth, nameWidth);
  const height = 70;
  const headRadius =  8;
  const legHeight = 20;

  const headCenter = {
    x: width / 2,
    y: (height / 3.5) - headRadius
 };
  const nameStyle = {
    fontSize: `${fontSize}px`,
    textAnchor: 'middle'
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

  const handleDrag = (e: Event, data: DraggableData) => onMove(id, x + data.deltaX , y + data.deltaY);

  return (
    <Selectable x={x} y={y} width={width} height={height} isSelected={isSelected} onMouseEnter={() => onSelect(id)} onMouseLeave={() => onUnselect(id)}>
      <Draggable onDrag={handleDrag} >
        <svg x={x} y={y} width={width} height={height} cursor={'pointer'}>
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

          /* actor name */
          <text x={width / 2} y={height * 0.95} style={nameStyle}>{name}</text>
        </svg>
      </Draggable>
    </Selectable>
  );
};

export default Actor;
