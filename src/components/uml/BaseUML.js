// @flow

import React, { Element } from 'react';
import Draggable from 'react-draggable';
import type {DraggableData} from 'react-draggable';

type BaseUMLProps = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  onMove: (id: number, x: number, y: number, componentType: string) => void;
  children?: Element<any>;
};

const BaseUML = (props: BaseUMLProps) => {
  const handleDrag = (e: Event, data: DraggableData) => {
    const { id, x, y } = props;

    props.onMove(id, x + data.deltaX, y + data.deltaY, props.type);
  };

  const style = {
    position: 'absolute',
    left: props.x,
    top: props.y
  };

  return (
    <Draggable onDrag={handleDrag}>
      <div style={style}>
        { props.children }
      </div>
    </Draggable>
  );
};

export default BaseUML;
