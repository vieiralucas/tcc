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
  onMove: (id: number, x: number, y: number) => void;
  children?: Element<any>;
};

const BaseUML = (props: BaseUMLProps) => {
  const handleDrag = (e: Event, data: DraggableData) => {
    const { id, x, y } = props;

    props.onMove(id, x + data.deltaX, y + data.deltaY);
  };

  const propsWithoutChildren = { ...props };
  delete propsWithoutChildren.children;

  const style = {
    position: 'absolute',
    left: props.x,
    top: props.y
  };

  return (
    <div style={style}>
      <Draggable onDrag={handleDrag}>
        { props.children }
      </Draggable>
    </div>
  );
};

export default BaseUML;
