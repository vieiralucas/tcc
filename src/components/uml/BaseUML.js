// @flow

import React, { Element } from 'react';
import Selectable from './Selectable';
import Draggable from 'react-draggable';
import type {DraggableData} from 'react-draggable';

type BaseUMLProps = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  onMove: (id: number, x: number, y: number) => void;
  onSelect: (id: number) => void;
  onUnselect: (id: number) => void;
  children?: Element<any>;
};

const BaseUML = (props: BaseUMLProps) => {
  const handleDrag = (e: Event, data: DraggableData) => {
    const { id, x, y } = props;

    props.onMove(id, x + data.deltaX, y + data.deltaY);
  };

  const onSelectedToggle = (isSelected: boolean) => {
    const { id } = props;

    if (isSelected) {
      props.onSelect(id);
    } else {
      props.onUnselect(id);
    }
  }

  const propsWithoutChildren = { ...props };
  delete propsWithoutChildren.children;

  return (
    <Selectable {...propsWithoutChildren} onSelectedToggle={onSelectedToggle}>
      <Draggable onDrag={handleDrag}>
        { props.children }
      </Draggable>
    </Selectable>
  );
};

export default BaseUML;
